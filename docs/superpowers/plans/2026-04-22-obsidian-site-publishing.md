# Obsidian Site Publishing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把当前网站从 `src/data/site.ts` 驱动的项目详情迁移到“Obsidian 固定发布目录 -> 同步脚本 -> 网站内容文件”的发布链路，同时保留现有站点视觉骨架。

**Architecture:** 保留 `siteData` 中的全站通用文案，但把“作品 / 项目”详情内容迁移到 `src/content/site/*.md`。新增一套纯 Node 同步脚本读取 Obsidian 固定目录与 `附件/`，生成网站内容文件与静态资源；页面层改为读取内容集合并根据 `contentType` 做统一详情页渲染。

**Tech Stack:** Astro content collections, TypeScript, Node.js fs/path, Vitest, Astro build

---

## 文件结构

- Modify: `package.json`
- Modify: `src/data/site.ts`
- Modify: `src/components/ListSection.astro`
- Modify: `src/components/ProjectDetail.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/projects/[slug].astro`
- Modify: `src/styles/global.css`
- Create: `src/content.config.ts`
- Create: `src/content/site/*.md`
- Create: `src/lib/site-content.ts`
- Create: `scripts/lib/obsidian-publishing.mjs`
- Create: `scripts/sync-obsidian-site-content.mjs`
- Create: `tests/site-content.test.ts`
- Create: `tests/obsidian-publishing.test.ts`

### Task 1: 建立当前基线并补充内容迁移测试

**Files:**
- Modify: `tests/site-data.test.ts`
- Create: `tests/site-content.test.ts`

- [ ] Step 1: 写失败测试，改为断言站点存在至少 5 条内容、支持 `contentType`、并能为详情页提供正文元数据。
- [ ] Step 2: 运行 `npm test -- tests/site-content.test.ts tests/site-data.test.ts`
- [ ] Step 3: 确认测试因内容加载模块和新断言不存在而失败。
- [ ] Step 4: 提交测试改动。

### Task 2: 建立网站内容集合与迁移后的首批内容文件

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/site/handicard.md`
- Create: `src/content/site/identity-mode.md`
- Create: `src/content/site/personal-os.md`
- Create: `src/content/site/sur-ron-x-mod.md`
- Create: `src/content/site/innni-lab.md`
- Create: `src/lib/site-content.ts`
- Modify: `src/data/site.ts`

- [ ] Step 1: 用最小 schema 定义网站内容集合，frontmatter 包含 `title`、`slug`、`contentType`、`statusLabel`、`status`、`description`、`summary`、`stage`、`metrics`、`keyPoints`、`closing`、`updated`。
- [ ] Step 2: 把当前 5 条项目内容迁移成独立 Markdown 文件，每条都带正文与 frontmatter。
- [ ] Step 3: 实现纯 TypeScript 的内容辅助模块，提供图标、类型标签、更新时间格式化等纯函数。
- [ ] Step 4: 收缩 `src/data/site.ts`，移除长项目正文，仅保留全站元信息、首页标题、关于页、联系方式、页脚等。
- [ ] Step 5: 运行 `npm test -- tests/site-content.test.ts tests/site-data.test.ts`
- [ ] Step 6: 确认测试通过并提交。

### Task 3: 先写同步流程测试

**Files:**
- Create: `tests/obsidian-publishing.test.ts`

- [ ] Step 1: 写失败测试，覆盖以下行为：
- [ ] Step 2: 读取固定目录下 `publish: true` 的笔记。
- [ ] Step 3: 为缺失 `slug` 和 `updated` 的笔记补兜底值。
- [ ] Step 4: 将 `![[附件/xxx.png]]` 和 Markdown 图片语法重写为网站资源路径。
- [ ] Step 5: 复制引用到的附件文件到 `public/project-assets/<slug>/`。
- [ ] Step 6: 运行 `npm test -- tests/obsidian-publishing.test.ts`
- [ ] Step 7: 确认因同步模块不存在或实现缺失而失败。

### Task 4: 实现 Obsidian 同步脚本

**Files:**
- Create: `scripts/lib/obsidian-publishing.mjs`
- Create: `scripts/sync-obsidian-site-content.mjs`
- Modify: `package.json`

- [ ] Step 1: 实现 frontmatter 解析、正文拆分、slug 生成、日期兜底、内容类型兜底判断。
- [ ] Step 2: 实现 Obsidian 图片语法和标准 Markdown 图片语法的提取与重写。
- [ ] Step 3: 实现附件复制和目标目录创建逻辑。
- [ ] Step 4: 实现把单篇笔记写成 `src/content/site/<slug>.md` 的输出函数。
- [ ] Step 5: 暴露 `npm run sync:obsidian` 命令，默认读取固定目录 `/Users/100jin/44krei/DH1Q/02-项目库/个人网站/网站发布/`。
- [ ] Step 6: 运行 `npm test -- tests/obsidian-publishing.test.ts`
- [ ] Step 7: 确认测试通过并提交。

### Task 5: 改造首页列表读取内容集合

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/components/ListSection.astro`
- Modify: `src/lib/site-content.ts`

- [ ] Step 1: 写失败测试，断言内容列表包含 `article` 类型时能给出文章图标，其它类型保持普通图标。
- [ ] Step 2: 运行 `npm test -- tests/site-content.test.ts`
- [ ] Step 3: 改造首页为在构建时读取内容集合，并把条目映射为列表展示数据。
- [ ] Step 4: 更新 `ListSection.astro`，支持 `article / project / work` 的列表图标与更新时间展示。
- [ ] Step 5: 运行 `npm test -- tests/site-content.test.ts`
- [ ] Step 6: 确认通过并提交。

### Task 6: 改造统一详情页以渲染 Markdown 正文

**Files:**
- Modify: `src/pages/projects/[slug].astro`
- Modify: `src/components/ProjectDetail.astro`
- Modify: `src/styles/global.css`

- [ ] Step 1: 写失败测试，断言详情内容至少支持更新时间、正文、关键要点和类型化显示文案。
- [ ] Step 2: 运行 `npm test -- tests/site-content.test.ts`
- [ ] Step 3: 改造动态路由，基于内容集合生成静态路径并渲染 Markdown 正文。
- [ ] Step 4: 扩展 `ProjectDetail.astro`，加入更新时间、正文区、文章型内容的显著标识。
- [ ] Step 5: 为正文图片、引用、小标题和图注补充样式。
- [ ] Step 6: 运行 `npm test -- tests/site-content.test.ts`
- [ ] Step 7: 确认通过并提交。

### Task 7: 端到端验证与使用说明

**Files:**
- Modify: `README.md`

- [ ] Step 1: 在 README 中补一节“从 Obsidian 同步内容到网站”的说明，写明固定目录、frontmatter 字段和命令。
- [ ] Step 2: 运行 `npm test`
- [ ] Step 3: 运行 `npm run build`
- [ ] Step 4: 如果同步目录可用，运行 `npm run sync:obsidian` 做一次真实同步检查。
- [ ] Step 5: 提交最终实现。

## 自检

- spec 中的固定 Obsidian 目录是否有对应任务：有，Task 4 和 Task 7。
- spec 中的 `contentType / publish / slug / updated` 规则是否有对应任务：有，Task 3 和 Task 4。
- spec 中的“默认不重写正文”边界是否体现在实现范围：有，仅做提炼与图片路径重写。
- spec 中的“统一详情骨架 + Markdown 正文”是否有对应任务：有，Task 2、Task 5、Task 6。
