import React from 'react';
import Layout from '@theme/Layout';
import { RoadmapHeader, RoadmapStages } from '@site/src/components/Roadmap';

// --- 关卡数据 ---
const stagesData = [
  {
    title: 'Python 零基础快速入门',
    desc: '从零快速入门 Python 这门语言。Python 和 PyTorch 的关系就好比 电脑操作系统 和 电脑软件的关系。',
    importance: 'must',
    status: 'upcoming',
    isLocked: true,
    asset: '/img/python.svg',
    gradient: 'from-emerald-500 to-teal-600',
    content: {
      videos: [
        {
          title: '查看视频教程',
          link: ''
        }
      ],
      docs: [
        { title: '查看文字教程', link: '/docs/python-basic' },
      ],
      downloads: [
        { title: '下载课程资料', link: '#' },
      ]
    }
  },
  {
    title: 'PyTorch 快速入门教程',
    desc: '入门 PyTorch 深度学习框架，对深度学习有个基础的了解。并学会训练以及应用你的第一个深度学习模型。',
    importance: 'must',
    status: 'released',
    isLocked: false,
    asset: '/img/pytorch.svg',
    gradient: 'from-violet-500 to-purple-600',
    content: {
      videos: [
        {
          title: '查看视频教程',
          link: 'https://www.bilibili.com/video/BV1hE411t7RN/'
        }
      ],
      docs: [
        { title: '查看文字教程', link: '/docs/pytorch-basic' },
      ],
      downloads: [
        { title: '下载课程资料', link: 'https://pan.quark.cn/s/c59a198b005d' },
      ]
    }
  },
  {
    title: 'PyTorch 进阶实战教程',
    desc: '入门之后，我们一起来了解下如何在实战中让你的模型训练的更好更快。',
    importance: 'recommended',
    status: 'upcoming',
    isLocked: true,
    asset: 'tower',
    gradient: 'from-blue-500 to-indigo-600',
    content: {
      videos: [
        {
          title: '查看视频教程',
          link: ''
        }
      ],
      docs: [
        { title: '查看文字教程', link: '' },
      ],
      downloads: [
        { title: '下载课程资料', link: '#' }
      ]
    }
  },
];

export default function PyTorchRoadmapPage() {
  return (
    <Layout title="PyTorch学习路线" description="游戏化的目标检测学习路线图">
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0c1222] font-sans">
        <RoadmapHeader
          title="PyTorch 学习路线"
          subtitle={`PyTorch 是深度学习中最流行的框架，或者说是工具。总而言之，先学好 PyTorch，是入门深度学习的最佳方式。
这个学习路线，完全适合零基础入门，帮助你从入门到精通。`}
          icon="/img/pytorch.svg"
          stages={stagesData}
        />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <RoadmapStages stages={stagesData} />
        </div>
      </div>
    </Layout>
  );
}
