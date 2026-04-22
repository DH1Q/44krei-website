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
