import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pinyin } from "pinyin-pro";
import YAML from "yaml";

export const DEFAULT_OBSIDIAN_SOURCE_DIR =
  "/Users/100jin/44krei/DH1Q/02-项目库/个人网站/网站发布";
export const DEFAULT_CONTENT_DIR = path.resolve(process.cwd(), "src/content/site");
export const DEFAULT_ASSET_DIR = path.resolve(process.cwd(), "public/project-assets");

const DEFAULT_CLOSING = "内容已从 Obsidian 同步到网站，后续可以继续补充。";

export function parseFrontmatterDocument(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!match) {
    return { data: {}, body: source.trim() };
  }

  return {
    data: YAML.parse(match[1]) ?? {},
    body: source.slice(match[0].length).trim(),
  };
}

function transliterateTitle(title) {
  return title
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[\u3400-\u9fff]/gu, (char) => ` ${pinyin(char, { toneType: "none" })} `);
}

export function slugifyTitle(title, fallback = "entry") {
  const slug = transliterateTitle(title)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return slug || fallback;
}

function inferContentType(frontmatter) {
  if (
    frontmatter.contentType === "article" ||
    frontmatter.contentType === "project" ||
    frontmatter.contentType === "work"
  ) {
    return frontmatter.contentType;
  }

  return "article";
}

function inferStatus(statusLabel, contentType) {
  if (!statusLabel) {
    return contentType === "article" ? "published" : "ongoing";
  }

  if (/(计划|待|长期实验)/u.test(statusLabel)) return "planned";
  if (/(已|上线|完成|成体系)/u.test(statusLabel)) return "published";
  return "ongoing";
}

function getTextParagraphs(body) {
  return body
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(
      (part) =>
        part &&
        !part.startsWith("#") &&
        !part.startsWith("![") &&
        !part.startsWith("![["),
    );
}

function summarize(text, maxLength = 72) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}

function extractKeyPoints(body) {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim())
    .filter(Boolean)
    .slice(0, 3);
}

function escapeYamlString(value) {
  return JSON.stringify(value ?? "");
}

function formatFrontmatterValue(value, indentLevel = 0) {
  const indent = "  ".repeat(indentLevel);

  if (Array.isArray(value)) {
    if (value.length === 0) return `${indent}[]`;

    return value
      .map((item) => {
        if (typeof item === "object" && item !== null && !Array.isArray(item)) {
          const entries = Object.entries(item);
          const [firstKey, firstValue] = entries[0] ?? [];

          if (!firstKey) return `${indent}- {}`;

          const lines = [`${indent}- ${firstKey}: ${formatFrontmatterScalar(firstValue)}`];
          for (const [key, nestedValue] of entries.slice(1)) {
            lines.push(`${indent}  ${key}: ${formatFrontmatterScalar(nestedValue)}`);
          }
          return lines.join("\n");
        }

        return `${indent}- ${formatFrontmatterScalar(item)}`;
      })
      .join("\n");
  }

  return `${indent}${formatFrontmatterScalar(value)}`;
}

function formatFrontmatterScalar(value) {
  if (value === null || value === undefined) return '""';
  if (typeof value === "string") return escapeYamlString(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function buildContentFile(entry) {
  const frontmatterLines = [
    "---",
    `title: ${escapeYamlString(entry.title)}`,
    `slug: ${entry.slug}`,
    `contentType: ${entry.contentType}`,
    `statusLabel: ${escapeYamlString(entry.statusLabel)}`,
    `status: ${entry.status}`,
    `description: ${escapeYamlString(entry.description)}`,
    `summary: ${escapeYamlString(entry.summary)}`,
    `stage: ${escapeYamlString(entry.stage)}`,
    `metrics: ${
      entry.metrics.length > 0 ? `\n${formatFrontmatterValue(entry.metrics, 1)}` : "[]"
    }`,
    entry.keyPoints.length > 0
      ? `keyPoints:\n${formatFrontmatterValue(entry.keyPoints, 1)}`
      : "keyPoints: []",
    `closing: ${escapeYamlString(entry.closing)}`,
    `updated: ${entry.updated}`,
    "---",
    "",
  ];

  return `${frontmatterLines.join("\n")}${entry.body}\n`;
}

function resolveAttachmentPath(sourceDir, originalPath) {
  const cleanedPath = originalPath.trim().replace(/^\.?\//, "").replace(/\|.*$/, "");
  return path.resolve(sourceDir, cleanedPath);
}

async function rewriteBodyImages(body, { sourceDir, assetDir, slug }) {
  const assetOutputDir = path.join(assetDir, slug);
  await mkdir(assetOutputDir, { recursive: true });

  let nextBody = body;

  const obsidianMatches = [...body.matchAll(/!\[\[([^[\]]+?)\]\]/g)];
  for (const match of obsidianMatches) {
    const original = match[0];
    const rawTarget = match[1];
    const sourcePath = resolveAttachmentPath(sourceDir, rawTarget);
    const filename = path.basename(sourcePath);
    const targetPath = path.join(assetOutputDir, filename);

    await copyFile(sourcePath, targetPath);
    nextBody = nextBody.replace(original, `![](/project-assets/${slug}/${filename})`);
  }

  const markdownMatches = [...nextBody.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)];
  for (const match of markdownMatches) {
    const original = match[0];
    const alt = match[1];
    const originalPath = match[2];

    if (/^(https?:)?\//.test(originalPath)) continue;

    const sourcePath = resolveAttachmentPath(sourceDir, originalPath);
    const filename = path.basename(sourcePath);
    const targetPath = path.join(assetOutputDir, filename);

    await copyFile(sourcePath, targetPath);
    nextBody = nextBody.replace(
      original,
      `![${alt}](/project-assets/${slug}/${filename})`,
    );
  }

  return nextBody;
}

function normalizeMetrics(metrics) {
  if (!Array.isArray(metrics)) return [];

  return metrics
    .filter(
      (metric) =>
        metric &&
        typeof metric === "object" &&
        typeof metric.label === "string" &&
        typeof metric.value === "string",
    )
    .map((metric) => ({
      label: metric.label,
      value: metric.value,
    }));
}

function createEntryFromNote(note, now) {
  const paragraphs = getTextParagraphs(note.body);
  const title = note.data.title || note.filename.replace(/\.md$/i, "");
  const summary = note.data.summary || paragraphs[0] || title;
  const closing = note.data.closing || paragraphs.at(-1) || DEFAULT_CLOSING;
  const statusLabel = note.data.statusLabel || "已发布";
  const contentType = inferContentType(note.data);

  return {
    title,
    slug:
      note.data.slug ||
      slugifyTitle(title, slugifyTitle(note.filename.replace(/\.md$/i, ""), "entry")),
    contentType,
    statusLabel,
    status: inferStatus(statusLabel, contentType),
    description: summarize(note.data.description || summary, 44),
    summary,
    stage: note.data.stage || `当前处于${statusLabel}阶段。`,
    metrics: normalizeMetrics(note.data.metrics),
    keyPoints:
      Array.isArray(note.data.keyPoints) && note.data.keyPoints.every((item) => typeof item === "string")
        ? note.data.keyPoints
        : extractKeyPoints(note.body),
    closing,
    updated:
      typeof note.data.updated === "string"
        ? note.data.updated
        : note.data.updated instanceof Date
          ? note.data.updated.toISOString().slice(0, 10)
          : now.toISOString().slice(0, 10),
  };
}

export async function syncObsidianSiteContent({
  sourceDir = DEFAULT_OBSIDIAN_SOURCE_DIR,
  contentDir = DEFAULT_CONTENT_DIR,
  assetDir = DEFAULT_ASSET_DIR,
  now = new Date(),
} = {}) {
  const sourceFiles = await readdir(sourceDir, { withFileTypes: true });
  const noteFiles = sourceFiles
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, "zh-Hans-CN"));

  await mkdir(contentDir, { recursive: true });
  await mkdir(assetDir, { recursive: true });

  const entries = [];

  for (const filename of noteFiles) {
    const source = await readFile(path.join(sourceDir, filename), "utf8");
    const parsed = parseFrontmatterDocument(source);

    if (parsed.data.publish !== true) continue;

    const entry = createEntryFromNote(
      {
        filename,
        data: parsed.data,
        body: parsed.body,
      },
      now,
    );
    const rewrittenBody = await rewriteBodyImages(parsed.body, {
      sourceDir,
      assetDir,
      slug: entry.slug,
    });
    const output = buildContentFile({
      ...entry,
      body: rewrittenBody,
    });

    await writeFile(path.join(contentDir, `${entry.slug}.md`), output);
    entries.push(entry);
  }

  return { entries };
}
