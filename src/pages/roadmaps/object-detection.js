import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { RoadmapHeader, RoadmapStages } from '@site/src/components/Roadmap';

// --- 关卡数据 ---
const beginnerStages = [
  {
    title: 'PyTorch 学习路线',
    desc: '先去学习 PyTorch 学习路线，掌握如何使用 PyTorch，再进行目标检测的学习。',
    importance: 'must',
    isLocked: false,
    asset: '/img/pytorch.svg',
    stubAsset: 'warrior',
    gradient: 'from-emerald-500 to-teal-600',
    content: {
      videos: [],
      docs: [
        { title: '先去学习下 PyTorch 学习路线', link: '/roadmaps/pytorch' },
      ],
      downloads: []
    }
  },
  {
    title: '目标检测 快速入门教程',
    desc: '我们先了解下什么是目标检测，目标检测数据集，以及尝试写一个属于我们自己的目标检测模型。让你发现目标检测原来就是这么一回事。',
    importance: 'must',
    status: 'ongoing',
    isLocked: false,
    asset: '/img/object-detection.png',
    stubAsset: 'castle',
    gradient: 'from-violet-500 to-purple-600',
    content: {
      videos: [
        {
          title: '查看视频教程',
          link: 'https://www.bilibili.com/video/BV19Z31z8ENH/'
        }
      ],
      docs: [
        { title: '查看文字教程', link: '/docs/object-detection-basic' },
      ],
      downloads: [
        { title: '下载课程资料', link: 'https://pan.quark.cn/s/f6d9d842a498?pwd=md8V' },
      ]
    }
  },
  {
    title: 'Ultralytics 目标检测实战训练教程（YOLO系列）',
    desc: '在这里，我们了解如何使用这个先进的 ultralytics 框架来训练你自己的目标检测模型。',
    importance: 'must',
    status: 'upcoming',
    isLocked: true,
    asset: '/img/ultralytics.svg',
    stubAsset: 'tree',
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
  }
];

const advancedStages = [
  {
    title: '目标检测 进阶教程（YOLO系列）',
    desc: '了解更多 YOLO 系列的高阶使用技巧与底层原理，深入掌握目标检测的进阶内容。',
    importance: 'recommended',
    status: 'upcoming',
    isLocked: true,
    asset: '/img/yolo.svg',
    stubAsset: 'tree',
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
  }
];

export default function ObjectDetectionRoadmapPage() {
  const [activeSeries, setActiveSeries] = useState('beginner');
  const currentStages = activeSeries === 'beginner' ? beginnerStages : advancedStages;

  return (
    <Layout title="目标检测学习路线" description="游戏化的目标检测学习路线图">
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0c1222] font-sans">
        <RoadmapHeader
          title="目标检测学习路线"
          subtitle={`目标检测是应用很广的领域。总而言之，就是我们想让模型帮我们找到我们感兴趣的目标。
          这个学习路线，帮助你从零开始了解目标检测，并帮助你应用到自己的课题/工作中。`}
          icon="/img/object-detection.png"
          stages={beginnerStages.concat(advancedStages)}
        />
        
        {/* Toggle UI */}
        <div className="max-w-6xl mx-auto px-4 pt-10 flex justify-center">
          <div className="inline-flex bg-gray-200/50 dark:bg-gray-800/50 rounded-full p-1.5 shadow-inner">
            <button
              onClick={() => setActiveSeries('beginner')}
              className={`px-8 py-2.5 rounded-full text-base font-bold transition-all duration-300 ${
                activeSeries === 'beginner'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-[0_2px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)]'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              入门系列
            </button>
            <button
              onClick={() => setActiveSeries('advanced')}
              className={`px-8 py-2.5 rounded-full text-base font-bold transition-all duration-300 ${
                activeSeries === 'advanced'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-[0_2px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)]'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              进阶系列
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {currentStages.length > 0 ? (
             <RoadmapStages stages={currentStages} />
          ) : (
             <div className="text-center py-20 text-gray-500 dark:text-gray-400 font-bold">
               当前系列还在筹备中，敬请期待！
             </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
