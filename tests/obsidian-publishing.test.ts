import { mkdtemp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { syncObsidianSiteContent } from "../scripts/lib/obsidian-publishing.mjs";

const tempDirs: string[] = [];

async function createTempDir(prefix: string) {
  const dir = await mkdtemp(path.join(os.tmpdir(), prefix));
  tempDirs.push(dir);
  return dir;
}

afterEach(async () => {
  await Promise.all(
    tempDirs.splice(0).map(async (dir) => {
      await import("node:fs/promises").then(({ rm }) =>
        rm(dir, { recursive: true, force: true }),
      );
    }),
  );
});

describe("syncObsidianSiteContent", () => {
  it("syncs publishable notes, fills slug and updated, and copies referenced images", async () => {
    const obsidianRoot = await createTempDir("obsidian-publishing-");
    const sourceDir = path.join(obsidianRoot, "网站发布");
    const attachmentsDir = path.join(sourceDir, "附件");
    const contentDir = path.join(obsidianRoot, "site-content");
    const assetDir = path.join(obsidianRoot, "public-assets");

    await mkdir(attachmentsDir, { recursive: true });
    await writeFile(path.join(attachmentsDir, "mode-diagram.png"), "fake-image");
    await writeFile(
      path.join(sourceDir, "Identity Mode.md"),
      `---
title: Identity Mode
publish: true
contentType: project
statusLabel: 进行中
---

# Identity Mode

这是正文。

![[附件/mode-diagram.png]]
`,
    );
    await writeFile(
      path.join(sourceDir, "Ignored Draft.md"),
      `---
title: Ignored Draft
publish: false
contentType: article
statusLabel: 草稿
---

不会同步。
`,
    );

    const result = await syncObsidianSiteContent({
      sourceDir,
      contentDir,
      assetDir,
      now: new Date("2026-04-22T00:00:00Z"),
    });

    expect(result.entries).toHaveLength(1);
    expect(result.entries[0]?.slug).toBe("identity-mode");
    expect(result.entries[0]?.updated).toBe("2026-04-22");

    const contentFiles = await readdir(contentDir);
    expect(contentFiles).toContain("identity-mode.md");

    const writtenContent = await readFile(path.join(contentDir, "identity-mode.md"), "utf8");
    expect(writtenContent).toContain("slug: identity-mode");
    expect(writtenContent).toContain("updated: 2026-04-22");
    expect(writtenContent).toContain("![](/project-assets/identity-mode/mode-diagram.png)");

    const copiedAsset = await readFile(
      path.join(assetDir, "identity-mode", "mode-diagram.png"),
      "utf8",
    );
    expect(copiedAsset).toBe("fake-image");
  });

  it("detects article notes and rewrites markdown image paths from the attachments folder", async () => {
    const obsidianRoot = await createTempDir("obsidian-publishing-");
    const sourceDir = path.join(obsidianRoot, "网站发布");
    const attachmentsDir = path.join(sourceDir, "附件");
    const contentDir = path.join(obsidianRoot, "site-content");
    const assetDir = path.join(obsidianRoot, "public-assets");

    await mkdir(attachmentsDir, { recursive: true });
    await writeFile(path.join(attachmentsDir, "essay-cover.png"), "cover-image");
    await writeFile(
      path.join(sourceDir, "重新搭起来.md"),
      `---
title: 把自己重新搭起来
publish: true
statusLabel: 已发布
updated: 2026-04-21
---

这是更像文章的正文。

![重建配图](附件/essay-cover.png)
`,
    );

    const result = await syncObsidianSiteContent({
      sourceDir,
      contentDir,
      assetDir,
      now: new Date("2026-04-22T00:00:00Z"),
    });

    expect(result.entries[0]?.contentType).toBe("article");
    const slug = result.entries[0]?.slug;

    const writtenContent = await readFile(path.join(contentDir, `${slug}.md`), "utf8");
    expect(writtenContent).toContain("contentType: article");
    expect(writtenContent).toContain(`![重建配图](/project-assets/${slug}/essay-cover.png)`);
  });

  it("preserves structured frontmatter fields for published notes", async () => {
    const obsidianRoot = await createTempDir("obsidian-publishing-");
    const sourceDir = path.join(obsidianRoot, "网站发布");
    const contentDir = path.join(obsidianRoot, "site-content");
    const assetDir = path.join(obsidianRoot, "public-assets");

    await mkdir(sourceDir, { recursive: true });
    await writeFile(
      path.join(sourceDir, "HandiCard.md"),
      `---
title: HandiCard
publish: true
contentType: project
statusLabel: MVP
slug: handicard
updated: 2026-04-22
description: 一个面向海外手帐用户的 AI 内页生成与作品分享平台。
summary: 用 AI 快速生成可打印的手帐内页卡片，并让用户在 Gallery 里发现、复用和再创作别人的作品。
stage: 结构和功能边界已经明确，处于 MVP 推进阶段。
metrics:
  - label: 方向
    value: AI × 手帐
  - label: 形态
    value: Web
  - label: 重点
    value: Generator + Gallery
keyPoints:
  - 目标不是做一个花哨工具，而是先打通生成、预览、导出、分享这条闭环。
  - 参考 Leonardo.ai、Canva 和 Pinterest，但会更垂直地服务手帐场景。
closing: 这是一个还在长出来的项目，但方向已经很清楚了。
---

## 项目定位

HandiCard 面向的是海外手帐用户。
`,
    );

    await syncObsidianSiteContent({
      sourceDir,
      contentDir,
      assetDir,
      now: new Date("2026-04-22T00:00:00Z"),
    });

    const writtenContent = await readFile(path.join(contentDir, "handicard.md"), "utf8");
    expect(writtenContent).toContain('description: "一个面向海外手帐用户的 AI 内页生成与作品分享平台。"');
    expect(writtenContent).toContain('summary: "用 AI 快速生成可打印的手帐内页卡片，并让用户在 Gallery 里发现、复用和再创作别人的作品。"');
    expect(writtenContent).toContain('stage: "结构和功能边界已经明确，处于 MVP 推进阶段。"');
    expect(writtenContent).toContain("metrics:");
    expect(writtenContent).toContain('  - label: "方向"');
    expect(writtenContent).toContain('    value: "AI × 手帐"');
    expect(writtenContent).toContain("keyPoints:");
    expect(writtenContent).toContain('  - "目标不是做一个花哨工具，而是先打通生成、预览、导出、分享这条闭环。"');
    expect(writtenContent).toContain('closing: "这是一个还在长出来的项目，但方向已经很清楚了。"');
  });
});
