import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getListEntryMeta } from "../src/lib/site-content";

const CONTENT_DIR = path.resolve(process.cwd(), "src/content/site");

function extractFrontmatter(source: string): string {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    throw new Error("Missing frontmatter block");
  }

  return match[1];
}

describe("site content files", () => {
  it("stores the homepage entries as markdown content files", async () => {
    const files = await readdir(CONTENT_DIR);
    const markdownFiles = files.filter((file) => file.endsWith(".md"));

    expect(markdownFiles.length).toBeGreaterThanOrEqual(5);
  });

  it("gives every content entry the required publishing frontmatter", async () => {
    const files = (await readdir(CONTENT_DIR)).filter((file) => file.endsWith(".md"));
    const sources = await Promise.all(
      files.map((file) => readFile(path.join(CONTENT_DIR, file), "utf8")),
    );
    const frontmatters = sources.map(extractFrontmatter);

    expect(frontmatters.every((frontmatter) => frontmatter.includes("title:"))).toBe(true);
    expect(frontmatters.every((frontmatter) => frontmatter.includes("contentType:"))).toBe(true);
    expect(frontmatters.every((frontmatter) => frontmatter.includes("statusLabel:"))).toBe(true);
    expect(frontmatters.every((frontmatter) => frontmatter.includes("updated:"))).toBe(true);
    expect(frontmatters.some((frontmatter) => frontmatter.includes("contentType: article"))).toBe(
      true,
    );
  });

  it("maps content types to the right list icon and metadata label", () => {
    expect(
      getListEntryMeta({
        contentType: "article",
        updated: "2026-04-22",
      }),
    ).toEqual({
      icon: "✦",
      label: "文章 · 更新于 2026-04-22",
    });

    expect(
      getListEntryMeta({
        contentType: "project",
        updated: "2026-04-21",
      }),
    ).toEqual({
      icon: "⌁",
      label: "项目 · 更新于 2026-04-21",
    });
  });
});
