// 教程文档数据
// cover: 可选，自定义封面图路径（如 '/img/covers/pytorch.png'），不填则使用分类默认渐变+图标
export const tutorials = [
  {
    id: 'pytorch-quick-start',
    title: 'PyTorch快速入门教程',
    description: '快速上手PyTorch深度学习框架',
    link: '/docs/pytorch-basic',
    category: 'PyTorch',
    type: 'doc',
    cover: '/img/pytorch.svg',
  },
  {
    id: 'object-detection-quick-start',
    title: '目标检测快速入门教程',
    description: '快速上手目标检测，了解基本概念和API使用',
    link: '/docs/object-detection-basic',
    category: '目标检测',
    type: 'doc',
    // cover: '/img/covers/object-detection.png',
  },
];
