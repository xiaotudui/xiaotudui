import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { 
  ArrowRight, Shield, Swords, Star, Coins, Scroll, Lock, 
  Sparkles, Zap
} from 'lucide-react';
import { roadmaps } from '@site/src/data/roadmap-data';


// --- 游戏素材配置 ---
const ASSETS = {
  tower: '/img/game/Tower_Blue.png',
  warrior: '/img/game/Warrior_Blue.gif',
  tree: '/img/game/tree.gif'
};

// --- 随机台词库 ---
const MAINLINE_QUOTES = [
  "学习路线模式会按学习路线推进，更适合从零开始系统入门。",
  "如果你已经知道自己想学什么，可以去自由关卡模式按兴趣学习。",
];

// --- 组件：公会接待员 (Hero 交互区) ---
const GuildMaster = () => {
  const [quote, setQuote] = useState("这里是学习路线模式：按路线循序学习，入门更轻松。");
  const [isTalking, setIsTalking] = useState(false);

  const handlePoke = () => {
    setIsTalking(false);
    setTimeout(() => {
      const randomQuote = MAINLINE_QUOTES[Math.floor(Math.random() * MAINLINE_QUOTES.length)];
      setQuote(randomQuote);
      setIsTalking(true);
    }, 50);
  };

  return (
    <div className="relative h-64 w-full flex items-end justify-center perspective-1000">
      <div className="absolute bottom-2 left-1/4 -translate-x-1/2 group cursor-pointer hover:-translate-y-2 transition-transform duration-500">
        <img src={ASSETS.tower} className="w-24 drop-shadow-2xl" alt="Tower" />
      </div>

      <div className="relative z-10 cursor-pointer group" onClick={handlePoke}>
        <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-64 bg-white dark:bg-gray-800 px-3 py-2 rounded-2xl shadow-xl border-2 border-blue-500/20 transform transition-all duration-300 ${isTalking ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-100 translate-y-2'}`}>
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300 text-center leading-relaxed block">{quote}</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-b-2 border-r-2 border-blue-500/20 transform rotate-45"></div>
        </div>

        <img 
          src={ASSETS.warrior} 
          className="w-32 h-32 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-200"
          style={{ imageRendering: 'pixelated' }} 
          alt="Warrior" 
        />
        
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <span className="animate-bounce text-xs font-bold text-blue-500">👆 戳我一下!</span>
        </div>
      </div>
    </div>
  );
};

// --- 组件：学习路线卡片 (Quest Card) ---
const QuestCard = ({ roadmap, index }) => {
  const isLocked = roadmap.comingSoon;
  const rank = isLocked ? '?' : (roadmap.rank || ['S', 'A', 'B'][index % 3]);
  const difficulty = (index % 3) + 3; 
  const xpReward = (roadmap.tutorialsCount || 10) * 150;

  const rankColors = {
    'S': 'text-orange-500 border-orange-500 bg-orange-50 dark:bg-orange-950/30',
    'A': 'text-purple-500 border-purple-500 bg-purple-50 dark:bg-purple-950/30',
    'B': 'text-blue-500 border-blue-500 bg-blue-50 dark:bg-blue-950/30',
    '?': 'text-gray-400 border-gray-400 bg-gray-100 dark:bg-gray-800'
  };

  return (
    <Link
      to={isLocked ? '#' : roadmap.link}
      className={`group relative block h-full no-underline hover:no-underline ${isLocked ? 'cursor-not-allowed' : ''}`}
      onClick={(e) => isLocked && e.preventDefault()}
    >
      <div className="relative h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-xl rounded-xl">
        {!isLocked && (
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
        )}

        <div className={`relative h-full bg-white dark:bg-[#1a1b26] rounded-xl border-2 ${isLocked ? 'border-gray-200 dark:border-gray-800' : 'border-gray-200 dark:border-gray-700 group-hover:border-blue-500/50 dark:group-hover:border-blue-500/50'} p-6 overflow-hidden flex flex-col`}>
          {/* 装饰性胶带效果 */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-200/80 dark:bg-yellow-900/50 shadow-sm rotate-1 z-10 opacity-80 backdrop-blur-sm"></div>

          <div className="flex justify-between items-start mb-4">
             <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-sm border ${isLocked ? 'bg-gray-100 border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700' : 'bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-gray-100 dark:border-gray-700'}`}>
                {/\.(svg|png|jpg|jpeg|webp|gif)$/i.test(roadmap.icon) ? (
                  <img src={roadmap.icon} alt="" className="w-8 h-8 object-contain" />
                ) : (
                  roadmap.icon
                )}
             </div>

             <div className={`flex flex-col items-center justify-center w-10 h-12 border-2 rounded-lg font-black text-xl shadow-sm ${rankColors[rank]}`}>
                <span className="text-[8px] uppercase font-bold opacity-60 leading-none mt-1">Rank</span>
                <span className="leading-none">{rank}</span>
             </div>
          </div>

          <div className="mb-6 flex-1 relative z-10">
             <h3 className={`text-xl font-bold mb-2 line-clamp-1 ${isLocked ? 'text-gray-400' : 'text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'}`}>
               {roadmap.title}
             </h3>
             <p className={`text-sm line-clamp-2 ${isLocked ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
               {roadmap.description}
             </p>
          </div>

          <div className="relative z-10">
             {isLocked ? (
               <div className="w-full py-3 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center gap-2 text-gray-400 font-bold text-sm bg-gray-50 dark:bg-gray-800/30">
                 <Lock className="w-4 h-4" />
                 敬请期待
               </div>
             ) : (
               <div className="w-full py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-blue-600 dark:group-hover:bg-blue-400 dark:group-hover:text-white transition-all shadow-lg group-hover:shadow-blue-500/30">
                 <Scroll className="w-4 h-4" />
                 查看学习路线
                 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
               </div>
             )}
          </div>
          
          {/* 锁定遮罩 */}
          {isLocked && (
            <div className="absolute inset-0 z-0 bg-gray-100/50 dark:bg-black/50 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-gray-300 dark:border-gray-600 rounded-full opacity-20 transform -rotate-12"></div>
            </div>
          )}
          
          {/* 背景纹理 */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
        </div>
      </div>
    </Link>
  );
};

// --- 主页面 ---
export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  const handleScrollToRoadmaps = () => {
    const roadmapsSection = document.getElementById('roadmaps');
    if (!roadmapsSection) return;
    const top = roadmapsSection.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({
      top: Math.max(top, 0),
      behavior: 'smooth',
    });
  };

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="土堆教程"
    >
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0c1222] font-sans overflow-x-hidden">
        
        {/* 1. Hero 区域 (公会大厅) */}
        <div className="relative bg-white dark:bg-[#151b2d] border-b border-gray-200 dark:border-gray-800 pt-16 pb-24">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            {/* 左侧文字 */}
            <div className="text-center md:text-left">
              <div className="inline-block px-5 py-2 mb-5 bg-yellow-400 text-black font-black text-sm md:text-base uppercase tracking-wider transform -rotate-1 shadow-sm rounded-md">
                学习路线模式
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                土堆教程
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-medium max-w-lg mx-auto md:mx-0 leading-relaxed">
                入门难？不知道先学哪个？<br />
                按照 <span className="font-bold text-gray-900 dark:text-white">学习路线</span>，循序学习，稳步提升。
              </p>

              <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 mb-4">
                <button
                  type="button"
                  onClick={handleScrollToRoadmaps}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold no-underline hover:no-underline hover:opacity-90 transition-opacity min-w-[220px]"
                >
                  开始学习路线
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 右侧互动区域 */}
            <div className="relative h-full flex items-end justify-center">
               <GuildMaster />
            </div>
          </div>
        </div>

        {/* 主内容容器 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
          
          {/* 2. 学习路线板 (Roadmaps) */}
          <section id="roadmaps" className="scroll-mt-28">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20 transform -rotate-3">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                 <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                   学习路线
                 </h2>
                 <p className="text-sm text-gray-500 font-medium mt-1">
                   精心设计的学习路线，大师成长之路。
                 </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {roadmaps.map((roadmap, idx) => (
                <QuestCard key={roadmap.id} roadmap={roadmap} index={idx} />
              ))}
            </div>
          </section>

        </div>
      </div>
    </Layout>
  );
}