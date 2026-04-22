# 44krei 个人网站

这个项目现在已经改成了“**Obsidian 写作，网站发布**”的内容工作流。

你平时不需要去改 `src/data/site.ts` 里的大段内容，也不需要单独维护一个网站后台。正常写作放在你的 Obsidian 固定目录里，之后让我来同步到网站即可。

## 内容来源

固定发布目录：

`/Users/100jin/44krei/DH1Q/02-项目库/个人网站/网站发布/`

附件目录：

`/Users/100jin/44krei/DH1Q/02-项目库/个人网站/网站发布/附件/`

规则：

- 待发布笔记混放在 `网站发布/`
- 图片统一放在 `网站发布/附件/`
- 只有 `publish: true` 的笔记会被同步
- 没写 `publish` 的笔记默认不会发布

## Obsidian 笔记属性

建议每篇要发布的笔记至少带这些属性：

```yaml
---
title: 标题
publish: true
contentType: article
statusLabel: 已发布
slug: your-slug
updated: 2026-04-22
---
```

字段说明：

- `title`：网站标题
- `publish`：是否发布到网站
- `contentType`：`article` / `project` / `work`
- `statusLabel`：首页右侧状态文案
- `slug`：网站 URL 标识，不写时会自动生成
- `updated`：网站显示的“最后更新时间”，不写时同步时自动补

## 同步命令

在项目根目录运行：

```bash
npm run sync:obsidian
```

这个命令会做这些事：

- 读取固定 Obsidian 发布目录
- 找出 `publish: true` 的笔记
- 生成或补齐 `slug` 和 `updated`
- 识别正文中的图片引用
- 把用到的图片复制到 `public/project-assets/<slug>/`
- 把笔记同步成网站内容文件到 `src/content/site/`

## 开发命令

```bash
npm test
npm run build
npm run dev
```

作用：

- `npm test`：跑同步逻辑和内容文件相关测试
- `npm run build`：验证 Astro 构建和动态详情页
- `npm run dev`：本地预览网站

## 网站内容结构

网站现在采用：

- `src/data/site.ts`
  - 全站通用文案
  - 首页 hero / 关于页 / 联系方式 / 页脚
- `src/content/site/*.md`
  - 每一条文章 / 项目 / 作品的结构化内容和正文
- `public/project-assets/<slug>/`
  - 同步后的正文配图

## 你以后最常见的工作流

1. 在 Obsidian 的 `网站发布/` 里写一篇笔记
2. 图片放进 `网站发布/附件/`
3. 让我帮你同步，或者你先运行 `npm run sync:obsidian`
4. 本地看效果：`npm run dev`
5. 检查通过后提交并推送
