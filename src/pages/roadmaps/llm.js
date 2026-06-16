import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { RoadmapHeader, RoadmapStages } from '@site/src/components/Roadmap';

// --- 关卡数据 ---
const beginnerStages = [
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
    title: '大语言模型快速入门教程',
    desc: '了解分词、词向量、语言模型、文本分类、序列标注等自然语言处理核心概念，先建立对文本任务的整体认识。',
    importance: 'must',
    status: 'upcoming',
    isLocked: true,
    asset: 'house',
    gradient: 'from-violet-500 to-purple-600',
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
        { title: '下载课程资料', link: '#' },
      ]
    }
  }
];

const advancedStages = [
];

export default function NlpLlmRoadmapPage() {
  const [activeSeries, setActiveSeries] = useState('beginner');
  const currentStages = activeSeries === 'beginner' ? beginnerStages : advancedStages;

  return (
    <Layout title="大语言模型学习路线" description="游戏化的大语言模型与自然语言处理学习路线图">
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0c1222] font-sans">
        <RoadmapHeader
          title="大语言模型学习路线"
          subtitle={`大语言模型正在改变自然语言处理和 AI 应用开发的方式。总而言之，先理解语言模型，再动手做 Prompt、RAG、微调和 Agent，是入门 LLM 最稳的路线。
这个学习路线，帮助你从 NLP 基础开始，逐步掌握大语言模型的原理、应用和工程落地。`}
          icon="🤖"
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
