export interface SkillItem {
  name: string;
  repo: string;
  description: string;
  status: "active" | "draft" | "legacy";
  domain: string;
  source: "GitHub" | "Local";
  useWhen: string[];
  rules: string[];
}

export interface ToolProjectItem {
  name: string;
  repo: string;
  description: string;
  status: string;
  tags: string[];
}

export const skillHubData = {
  meta: {
    title: "K-0 Skill Hub",
    description:
      "44krei 的个人技能库总览：把 GitHub 上分散的 skills、AI 工作流和 Krei MD 这类工具项目放到一个可以检索和维护的界面里。",
  },
  hero: {
    eyebrow: "PERSONAL AI OPERATING LAYER",
    title: "K-0 Skill Hub",
    description:
      "这里不是展示一堆仓库，而是把它们整理成可调用的能力索引：什么时候用、解决什么问题、当前状态、入口在哪里。",
  },
  management: [
    {
      title: "GitHub 负责版本",
      description:
        "每个 skill 仍然保留在 GitHub 仓库里，方便回滚、同步、复用和在不同 Agent 之间迁移。",
    },
    {
      title: "网站负责总览",
      description:
        "个人网站只显示稳定入口：当前推荐、旧版归档、工具项目和使用规则，避免 GitHub 仓库越长越像杂物间。",
    },
    {
      title: "Skill 负责执行习惯",
      description:
        "真正重要的不是收藏，而是让 K-0 在对应场景自动加载正确方法，少写废话，少忘规则。",
    },
  ],
  skills: [
    {
      name: "k0-narrator-short-video",
      repo: "https://github.com/DH1Q/k0-offscreen-narrative-skill/tree/main/k0-narrator-short-video",
      description:
        "短视频旁白 skill：The Stanley Parable 式高位叙述者，适合 AI 小玩意、Vibe Coding、工具失败/成功记录。",
      status: "active",
      domain: "短视频 / 旁白 / Vibe Coding",
      source: "GitHub",
      useWhen: ["剪辑后视频配旁白", "Gemini 给出画面时间线", "AI 小玩意项目记录", "抖音标题与文案压缩"],
      rules: [
        "第三人称“他”，不是第一人称 vlog。",
        "Gemini 只作为事实素材；降权旁白方向、金句、情绪升华。",
        "按视频时长计算中文字数预算，避免 TTS 实际输出超时。",
      ],
    },
    {
      name: "k0-offscreen-narrative-skill",
      repo: "https://github.com/DH1Q/k0-offscreen-narrative-skill",
      description:
        "旧版 K-0 画外旁白叙事器：偏双声道结构，包含 Narrator 与 K-0 画外搭档。",
      status: "legacy",
      domain: "叙事 / 画外旁白",
      source: "GitHub",
      useWhen: ["需要更完整的旁白系统", "需要双声道叙事结构", "回看旧版规则"],
      rules: ["保留为历史版本。", "当前短视频优先使用 k0-narrator-short-video。"],
    },
    {
      name: "codex-writing-skill",
      repo: "https://github.com/DH1Q/codex-writing-skill",
      description:
        "个人写作 skill：用于让 Codex/K-0 更贴近 44krei 的写作判断、表达节奏和内容输出习惯。",
      status: "active",
      domain: "写作 / 内容输出",
      source: "GitHub",
      useWhen: ["写文章", "改稿", "把想法整理成可发布内容"],
      rules: ["保持个人判断，不写通用 AI 腔。", "先服务表达，再服务格式。"],
    },
  ] satisfies SkillItem[],
  projects: [
    {
      name: "Krei MD",
      repo: "https://github.com/DH1Q/krei-md",
      description:
        "面向个人写作发布、公众号排版和 GP-M322 小票打印的 Markdown 编辑器，也是 Hermes 出票系统的本地控制台。",
      status: "active",
      tags: ["Markdown", "小票机", "Hermes", "Web 控制台"],
    },
  ] satisfies ToolProjectItem[],
} as const;
