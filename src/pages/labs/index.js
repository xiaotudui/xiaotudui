import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { 
  Search, Filter, FlaskConical, Hammer, 
  Settings, Wrench, Search as SearchIcon, 
  X, Crown, LayoutGrid, Gem, 
  ArrowRight, Microscope, Box, Menu, 
  Cpu, Sparkles, ExternalLink
} from 'lucide-react';
import { toolsData, getAllCategories } from '../../data/labs-data';

// --- 资源素材 ---
const ASSETS = {
  houseBuild: '/img/game/house-build.gif',
};

const isAssetPath = (v) =>
  typeof v === 'string' && (v.startsWith('/') || v.startsWith('http') || /\.(svg|png|jpg|jpeg|gif|webp)$/i.test(v));

// --- 组件：首席工程师 NPC ---
const LabKeeper = () => {
  const [quote, setQuote] = useState("这里汇聚各种工具帮助你更好的学习");
  
  const handlePoke = () => {
    const quotes = [
      "小心！那个原型机还不稳定！",
      "想要更高效的工具？你来对地方了。",
      "科学与魔法的界限其实很模糊。",
      "别碰那个红色的按钮，算了，碰吧。",
      "正在校准 YOLO 数据集的精度。"
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  return (
    <div className="relative h-64 w-full flex items-end justify-center perspective-1000 group/npc select-none">
      <div className="relative z-10 cursor-pointer group" onClick={handlePoke}>
        {/* 对话气泡 */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-56 bg-white dark:bg-gray-800 px-3 py-2 rounded-xl shadow-xl border-2 border-indigo-200 dark:border-indigo-800 transform transition-all duration-300 origin-bottom opacity-100 scale-100">
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 text-center leading-relaxed block">{quote}</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-gray-800 border-b-2 border-r-2 border-indigo-200 dark:border-indigo-800 rotate-45"></div>
        </div>
        <img src={ASSETS.houseBuild} className="w-52 h-52 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-200" style={{ imageRendering: 'pixelated' }} alt="House Build" />
      </div>
    </div>
  );
};

// --- 组件：工程道具卡片 (Lab Tool Card) ---
const ToolCard = ({ tool }) => {
  const config = useMemo(() => {
    const map = {
      '目标检测': {
        icon: Box,
        colors: ['#0891b2', '#3b82f6']
      },
      default: {
        icon: Wrench,
        colors: ['#2563eb', '#6366f1']
      },
    };

    return map[tool.category] || map.default;
  }, [tool.category]);

  const Icon = config.icon;
  const gradient = `linear-gradient(135deg, ${config.colors[0]}, ${config.colors[1]})`;

  return (
    <Link to={tool.link} className="group relative block h-full no-underline hover:no-underline">
      <div className="relative h-full transition-all duration-500 ease-out hover:-translate-y-3">
        <div
          className="absolute -inset-3 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${config.colors[0]}25, transparent 70%)` }}
        />

        <div className="relative h-full bg-white dark:bg-[#1a1b26] rounded-2xl overflow-hidden flex flex-col shadow-[0_2px_15px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_15px_rgba(0,0,0,0.3)] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500 border border-gray-100 dark:border-gray-800 group-hover:border-transparent">
          <div className="relative h-32 overflow-hidden" style={{ background: gradient }}>
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20z' fill='%23fff'/%3E%3C/svg%3E")`,
                backgroundSize: '24px 24px'
              }}
            />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-black/5 rounded-full blur-2xl" />

            <div className="absolute inset-0 flex items-center justify-center">
              {isAssetPath(tool.icon) ? (
                <div className="w-24 h-24 flex items-center justify-center px-2">
                  <img
                    src={tool.icon}
                    alt={`${tool.title} icon`}
                    className="max-w-full max-h-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : tool.icon ? (
                <span className="text-5xl drop-shadow-lg">{tool.icon}</span>
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Icon className="w-9 h-9 text-white drop-shadow-lg" strokeWidth={1.5} />
                </div>
              )}
            </div>

            <div className="absolute top-3 left-3">
              <span className="px-2 py-0.5 rounded-md bg-black/20 backdrop-blur-sm text-white/90 text-[10px] font-bold tracking-wide border border-white/10">
                {tool.category || '工具'}
              </span>
            </div>

            {tool.isNew && (
              <div className="absolute top-3 right-3">
                <span className="px-2 py-0.5 rounded-md bg-red-500/85 text-white text-[10px] font-black tracking-wide">
                  NEW
                </span>
              </div>
            )}

            <div className="absolute -bottom-px left-0 right-0">
              <svg viewBox="0 0 400 20" preserveAspectRatio="none" className="w-full h-5 block">
                <path d="M0,20 Q200,0 400,20 L400,20 L0,20 Z" className="fill-white dark:fill-[#1a1b26]" />
              </svg>
            </div>
          </div>

          <div className="flex-1 flex flex-col px-5 pb-5 pt-3">
            <h3 className="text-lg font-black mb-1.5 line-clamp-2 text-gray-900 dark:text-gray-100">
              {tool.title}
            </h3>
            <p className="text-[13px] line-clamp-2 text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-4">
              {tool.description}
            </p>

            <div
              className="w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 group-hover:scale-[1.02] mt-auto"
              style={{ background: gradient, boxShadow: `0 4px 20px ${config.colors[0]}25` }}
            >
              启动工具
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function LabIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 获取数据
  const categories = getAllCategories();

  // 筛选逻辑
  const filteredTools = toolsData.filter(tool => {
    const matchCategory = selectedCategory === '全部' || tool.category === selectedCategory;
    const matchSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <Layout
      title='土堆实验室'
      description='深度学习工具工坊'
    >
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0c1222] font-sans selection:bg-cyan-500/30">
        
        {/* --- Hero: 研发中心大厅 --- */}
        <div className="relative bg-white dark:bg-[#151b2d] border-b border-gray-200 dark:border-gray-800 pt-12 pb-24 overflow-hidden">
          {/* 科技背景 */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-[0.03] dark:opacity-[0.05]"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-300 rounded-lg text-xs font-bold uppercase tracking-widest shadow-sm">
                <Microscope className="w-3.5 h-3.5" />
                TUDUI LAB
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
                土堆 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">实验室</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-lg mx-auto md:mx-0 leading-relaxed">
                在这里，我们制造并收集最前沿的深度学习辅助工具。
                <br/>
                目前已有 <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400 text-xl">{toolsData.length}</span> 个工具投入使用。
              </p>
            </div>
            <div className="relative h-64 flex items-end justify-center">
               <LabKeeper />
            </div>
          </div>
        </div>

        {/* --- Main Content: 工具展示区 --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
          
          {/* 1. 响应式控制台 (Filter Console) */}
          <div className="bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-4 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
             
             {/* 分类筛选 */}
             <div className="w-full md:w-auto">
               {/* Mobile: Select */}
               <div className="md:hidden relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Filter className="h-4 w-4 text-gray-500" />
                 </div>
                 <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 text-base border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none font-bold shadow-sm"
                 >
                   {categories.map((cat) => (
                     <option key={cat} value={cat}>{cat}</option>
                   ))}
                 </select>
                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                   <Menu className="h-4 w-4 text-gray-500" />
                 </div>
               </div>

               {/* Desktop: Tabs */}
               <div className="hidden md:flex items-center gap-2">
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg mr-2 shrink-0 border border-gray-200 dark:border-gray-700">
                   <Filter className="w-4 h-4 text-gray-500" />
                   <span className="text-xs font-bold text-gray-500 uppercase">Class</span>
                 </div>
                 {categories.map(cat => (
                   <button
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap border-2 ${
                       selectedCategory === cat 
                         ? 'bg-cyan-50 dark:bg-cyan-900/30 border-cyan-500 text-cyan-600 dark:text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                         : 'bg-transparent border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                     }`}
                   >
                     {cat}
                   </button>
                 ))}
               </div>
             </div>

             {/* 搜索栏 */}
             <div className="relative w-full md:w-72 group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-4 w-4 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="搜索工具原型..."
                  className="block w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                    <X className="w-3 h-3 text-gray-500" />
                  </button>
                )}
             </div>
          </div>

          {/* 2. 工具网格 (Gadget Grid) */}
          <div className="min-h-[400px] mb-20">

             {/* Grid */}
             {filteredTools.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 {filteredTools.map((tool, idx) => (
                  <ToolCard key={tool.id} tool={tool} />
                 ))}
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center py-24 text-center border-4 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl bg-gray-50/50 dark:bg-gray-800/20">
                 <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 animate-bounce">
                   <Hammer className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                 </div>
                 <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">未找到原型机</h3>
                 <p className="text-gray-500 font-medium max-w-xs mx-auto">请尝试调整搜索参数，或者等待研发部门更新。</p>
                 <button onClick={() => {setSearchQuery(''); setSelectedCategory('全部');}} className="mt-6 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-cyan-500/30">
                    重启扫描
                 </button>
               </div>
             )}
          </div>
        </div>
      </div>
    </Layout>
  );
}