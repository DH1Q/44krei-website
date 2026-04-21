export type ProjectStatus = "ongoing" | "published" | "planned";
export type ProjectKind = "detail" | "placeholder";

export interface ProjectDetail {
  summary: string;
  stage: string;
  metrics: Array<{ label: string; value: string }>;
  points: string[];
  closing: string;
}

export interface ProjectItem {
  slug: string;
  icon: string;
  title: string;
  statusLabel: string;
  description: string;
  meta: string;
  status: ProjectStatus;
  kind: ProjectKind;
  detail?: ProjectDetail;
}

export interface JourneyItem {
  icon: string;
  title: string;
  description: string;
  tag: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ChannelItem {
  icon: string;
  title: string;
  description: string;
  tag: string;
}

export const siteData = {
  meta: {
    title: "44krei | 邓又齐的实验现场",
    description:
      "邓又齐 / DH1Q / 44krei 的个人网站。记录设计、AI、项目实验、身体训练，以及一个人如何把自己重新搭起来。",
  },
  nav: {
    homeLabel: "首页",
    aboutLabel: "关于",
    contactLabel: "联系",
    badgeLabel: "我是 44krei",
  },
  home: {
    hero: {
      eyebrow: "设计师 · 实验型创作者 · 概率决策者",
      title: "把自己重新搭起来，把有意思的东西做出来",
      description:
        "经历过破产、低谷和重建。现在用设计、AI、项目实验和概率决策，把生活、工作和长期上升通道一件件重新搭起来。",
      cta: "聊聊项目 →",
    },
    projectsTitle: "作品 / 项目",
    journeyTitle: "轨迹",
    channelsTitle: "账号",
    contactTitle: "联系我",
  },
  about: {
    intro:
      "我叫邓又齐，也常用 DH1Q / 44krei。曾经亏掉几百万，走过一段很低很硬的路。后来靠阅读、思考和反复试错，把自己从赌徒心态一点点改造成更尊重概率、更尊重现实的人。现在我做设计，做项目，练身体，也把自己的方法和系统写成可以长期运行的结构。",
    whatIDo: [
      "做设计，也做那些标准岗位边界之外的项目实验",
      "把 AI、Obsidian 和个人工作流揉成能长期运行的外部大脑",
      "继续做真实世界里的升级：赚钱、带娃、训练、重建生活结构",
      "保留好奇心，遇到没现成答案的事就自己做一个出来",
    ],
    milestones: [
      {
        icon: "↺",
        title: "从破产低谷到认知重建",
        description: "经历周期毒打后，开始用第一性原理和概率思维重新理解世界。",
        tag: "重建",
      },
      {
        icon: "△",
        title: "跨设计、AI、项目、身体训练的整合能力",
        description: "不是单一工种，而是把多个系统拼成一个能持续输出的人。",
        tag: "能力",
      },
      {
        icon: "◎",
        title: "持续写系统、做实验、留过程",
        description: "不爱说教，更愿意把试验过程和结果摊开给别人看。",
        tag: "方法",
      },
      {
        icon: "▣",
        title: "已成家、有孩子，还在往上爬",
        description: "责任没有让实验停止，反而让每一次判断更有重量。",
        tag: "现实",
      },
    ] satisfies JourneyItem[],
    faq: [
      {
        question: "你现在到底在做什么？",
        answer:
          "一边用设计和项目养活自己，一边把 AI、系统和个人品牌这些线慢慢拧成一个长期可持续的结构。",
      },
      {
        question: "为什么网站里会写到低谷和重建？",
        answer:
          "因为这不是包装出来的人设。很多判断和方法，都来自真实付过代价之后的修正。",
      },
      {
        question: "这个网站更像作品集还是个人实验场？",
        answer:
          "更像实验场。作品只是结果的一部分，过程、判断和正在发生的变化同样重要。",
      },
    ] satisfies FaqItem[],
  },
  projects: [
    {
      slug: "handicard",
      icon: "🗂",
      title: "HandiCard",
      statusLabel: "MVP",
      description: "一个面向海外手帐用户的 AI 内页生成与作品分享平台。",
      meta: "AI 生成 / Web 产品 / 海外手帐",
      status: "ongoing",
      kind: "detail",
      detail: {
        summary:
          "用 AI 快速生成可打印的手帐内页卡片，并让用户在 Gallery 里发现、复用和再创作别人的作品。",
        stage: "结构和功能边界已经明确，处于 MVP 推进阶段。",
        metrics: [
          { label: "方向", value: "AI × 手帐" },
          { label: "形态", value: "Web" },
          { label: "重点", value: "Generator + Gallery" },
        ],
        points: [
          "目标不是做一个花哨工具，而是先打通生成、预览、导出、分享这条闭环。",
          "参考 Leonardo.ai、Canva 和 Pinterest，但会更垂直地服务手帐场景。",
          "项目很能代表我现在的做事方式：从兴趣、美感和实际需求出发，慢慢做成产品。",
        ],
        closing: "这是一个还在长出来的项目，但方向已经很清楚了。",
      },
    },
    {
      slug: "identity-mode",
      icon: "⎇",
      title: "Identity Mode",
      statusLabel: "进行中",
      description: "一个强调状态连续性的系统，不是普通任务管理工具。",
      meta: "状态系统 / 产品概念 / 自我管理",
      status: "ongoing",
      kind: "detail",
      detail: {
        summary:
          "核心不是记录任务，而是帮助人进入某个有重量的身份状态，让项目、日志和行动都围绕这个状态展开。",
        stage: "MVP 信息架构和核心交互原则已经明确。",
        metrics: [
          { label: "核心单位", value: "Mode" },
          { label: "关联对象", value: "Project" },
          { label: "关键动作", value: "切换状态" },
        ],
        points: [
          "一个时刻只有一个 Mode，强调状态切换的重量感。",
          "Project 只是挂在 Mode 上的阶段目标，不再把人拆成一堆零散任务。",
          "这个项目本质上是在回答一个问题：人如何更稳定地进入自己想成为的状态。",
        ],
        closing: "如果它能跑顺，会是我个人系统里的一个关键支点。",
      },
    },
    {
      slug: "personal-os",
      icon: "⌘",
      title: "个人影响力操作系统",
      statusLabel: "系统化",
      description: "把个人品牌、内容结构和长期策略做成可视化作战地图。",
      meta: "品牌系统 / 可视化 / 自我治理",
      status: "published",
      kind: "detail",
      detail: {
        summary:
          "这不是通用模板，而是用真实数据把我的时间线、资产、风格、人设和行动路径做成一个可查阅的控制台。",
        stage: "方法论和数据结构已经沉淀，继续往更稳定的执行系统推进。",
        metrics: [
          { label: "对象", value: "DH1Q / 44krei" },
          { label: "作用", value: "品牌控制台" },
          { label: "目标", value: "长期可执行" },
        ],
        points: [
          "把抽象方法论变成随时可看、可复盘、可继续补全的结构。",
          "这件事很像我现在整个人的缩影：不想空谈，所以把自己写成系统。",
          "它既服务内容表达，也服务现实世界里的行动决策。",
        ],
        closing: "这不是为了显得高级，而是为了减少混乱，保持方向。",
      },
    },
    {
      slug: "sur-ron-x-mod",
      icon: "⚙",
      title: "轻蜂 X 改装实验",
      statusLabel: "打样中",
      description: "找不到现成的，那就自己做一个 3D 打印改装件。",
      meta: "改装 / 3D 打印 / 非教学展示",
      status: "ongoing",
      kind: "detail",
      detail: {
        summary:
          "这不是教程，而是一条很典型的 44krei 式路径：因为一个真实需求，自己建模、自己打印、自己装车。",
        stage: "内容和镜头清单已经整理，适合持续扩成系列实验。",
        metrics: [
          { label: "载体", value: "轻蜂 X" },
          { label: "方式", value: "3D 打印" },
          { label: "表达", value: "展示型内容" },
        ],
        points: [
          "重点不是参数，而是那种‘现成的没有，那我自己做’的劲儿。",
          "它很适合代表我的动手能力、项目表达和审美直觉。",
          "这种项目以后会继续成为网站里的长期栏目。",
        ],
        closing: "有些东西最能说明一个人，不靠自我介绍，靠他亲手做出来的东西。",
      },
    },
    {
      slug: "innni-lab",
      icon: "◧",
      title: "Innni Lab",
      statusLabel: "长期实验",
      description: "把系统、设计、内容和产品实验收拢到同一个长期容器里。",
      meta: "实验容器 / 长期主义 / 个人品牌",
      status: "planned",
      kind: "placeholder",
    },
  ] satisfies ProjectItem[],
  journey: [
    {
      icon: "↺",
      title: "从赌徒心态转向概率决策",
      description: "不是突然开窍，而是被现实狠狠干过之后，重新学习如何判断。",
      tag: "认知",
    },
    {
      icon: "◇",
      title: "深度通才式创作",
      description: "设计、AI、产品感觉、改装、系统搭建，很多线最终在一个人身上汇合。",
      tag: "整合",
    },
    {
      icon: "▤",
      title: "把试试变成方法",
      description: "44 的核心不是盲试，而是带着判断力去试，做成一个一个可留下来的作品。",
      tag: "44",
    },
    {
      icon: "▸",
      title: "现实责任下继续往上爬",
      description: "带娃、还债、接单、训练，很多事同时存在，所以每一步都更有重量。",
      tag: "现实",
    },
  ] satisfies JourneyItem[],
  channels: [
    {
      icon: "抖",
      title: "抖音 · 44krei",
      description: "正在起号。会继续放设计、AI、项目实验和重建过程里的短内容。",
      tag: "建设中",
    },
    {
      icon: "红",
      title: "小红书 · 44krei",
      description: "作为主阵地之一持续更新，把项目、系统和有意思的实验慢慢铺开。",
      tag: "建设中",
    },
  ] satisfies ChannelItem[],
  contact: {
    emailLabel: "idnnnnnnn@gmail.com",
    emailHint: "商务合作 / 项目沟通",
    wechatLabel: "-iDnnnnnnn",
    wechatHint: "交个朋友 / 聊聊项目",
    modalTitle: "添加微信",
    modalHint: "现在可以直接复制微信号添加我，也可以直接扫码加我微信。",
    modalCopy: "复制微信号：-iDnnnnnnn",
    copyValue: "-iDnnnnnnn",
  },
  footer: {
    copyright: "© 2026 44krei",
    links: [
      { label: "首页", href: "/" },
      { label: "关于", href: "/about" },
      { label: "项目", href: "/#projects" },
    ],
  },
} as const;

export type SiteData = typeof siteData;
