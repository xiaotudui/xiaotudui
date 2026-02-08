// 工具数据
export const toolsData = [
  {
    id: 1,
    title: 'YOLO数据集查看器',
    description: '可视化 YOLO 格式的目标检测数据集',
    category: '目标检测',
    icon: '🎯',
    color: 'bg-blue-500',
    link: '/labs/yolo-dataset-viewer',
    isNew: false
  },
  {
    id: 2,
    title: 'COCO数据集查看器',
    description: '可视化 COCO 格式的目标检测数据集',
    category: '目标检测',
    icon: '📊',
    color: 'bg-green-500',
    link: '/labs/coco-dataset-viewer',
    isNew: false
  },
  {
    id: 3,
    title: 'VOC数据集查看器',
    description: '可视化 VOC 格式的目标检测数据集',
    category: '目标检测',
    icon: '📁',
    color: 'bg-purple-500',
    link: '/labs/voc-dataset-viewer',
    isNew: false
  },
]

// 获取所有分类
export const getAllCategories = () => {
  const categories = [...new Set(toolsData.map(item => item.category))]
  return ['全部', ...categories]
}
