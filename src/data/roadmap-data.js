// 路线图数据
// icon 支持：emoji 字符串（如 '🤖'）或图片路径（如 '/img/roadmap/pytorch.svg'，支持 .svg/.png/.jpg 等）
export const roadmaps = [
    {
    id: 'pytorch',
    title: 'PyTorch 学习路线',
    description: '适合零基础入门，学习PyTorch深度学习框架。强烈推荐作为学习旅途的第一站。',
    link: '/roadmaps/pytorch',
    icon: '/img/pytorch.svg',
    rank: 'S',
    difficulty: 'S',
    },
  {
    id: 'object-detection',
    title: '目标检测学习路线',
    description: '适合零基础入门，学习目标检测的核心技术和实战应用。',
    link: '/roadmaps/object-detection',
    icon: '/img/object-detection.png',
    rank: 'S',
    difficulty: 'S',
  },
  {
    id: 'nlp-llm',
    title: '大语言模型/自然语言处理',
    description: '从基础NLP到大型语言模型的完整学习路径',
    link: '/roadmaps/nlp-llm',
    icon: '🤖',
    comingSoon: true,
  },
];
