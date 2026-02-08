import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { 
  Search, Filter, FlaskConical, Hammer, 
  Settings, Wrench, Search as SearchIcon, 
  X, Crown, LayoutGrid, Gem, Zap, 
  ArrowRight, Microscope, Box, Menu, 
  Cpu, Sparkles, ExternalLink
} from 'lucide-react';
import { toolsData, getAllCategories } from '../../data/labs-data';

// --- 资源素材 ---
const ASSETS = {
  tower: '/img/game/Tower_Blue.png',
  warrior: '/img/game/Warrior_Blue.gif',
};

// --- 组件：首席工程师 NPC ---
const LabKeeper = () => {
  const [isTalking, setIsTalking] = useState(false);
  const [quote, setQuote] = useState("欢迎来到研发中心。");
  
  const handlePoke = () => {
    setIsTalking(true);
    const quotes = [
      "小心！那个原型机还不稳定！",
      "想要更高效的工具？你来对地方了。",
      "科学与魔法的界限... 其实很模糊。",
      "别碰那个红色的按钮... 算了，碰吧。",
      "正在校准 YOLO 数据集的精度..."
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setTimeout(() => setIsTalking(false), 3000);
  };

  return (
    <div className="relative h-64 w-full flex items-end justify-center perspective-1000 group/npc select-none">
      <div className="absolute bottom-2 left-1/4 -translate-x-1/2 group-hover/npc:-translate-y-2 transition-transform duration-500">
        <img src={ASSETS.tower} className="w-24 drop-shadow-2xl grayscale-[20%] hue-rotate-180" alt="Tower" />
      </div>
      <div className="relative z-10 cursor-pointer group" onClick={handlePoke}>
        {/* 对话气泡 */}
        <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-52 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-xl border-2 border-cyan-200 dark:border-cyan-800 transform transition-all duration-300 origin-bottom ${isTalking ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
          <p className="text-xs font-bold text-gray-700 dark:text-gray-300 text-center leading-relaxed font-mono">
            <span className="text-cyan-600 dark:text-cyan-400 mr-1">&gt;</span>
            {quote}
          </p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-gray-800 border-b-2 border-r-2 border-cyan-200 dark:border-cyan-800 rotate-45"></div>
        </div>
        <img src={ASSETS.warrior} className="w-32 h-32 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-200" style={{ imageRendering: 'pixelated' }} alt="Engineer" />
      </div>
    </div>
  );
};

// --- 组件：工程道具卡片 (Lab Tool Card) ---
const ToolCard = ({ tool, index }) => {
  // 映射配置：给不同的工具赋予不同的“稀有度”外观
  const config = useMemo(() => {
    // 根据 ID 或 index 模拟不同的科技等级
    const techLevel = (index % 3) + 1; // 1: Mk.I, 2: Mk.II, 3: Mk.III
    
    // 映射样式
    const map = {
      '目标检测': { 
        rank: 'SR', 
        label: 'DETECTION',
        color: 'text-cyan-600 dark:text-cyan-400', 
        border: 'border-cyan-500', 
        bg: 'bg-cyan-50 dark:bg-cyan-900/20', 
        shadow: 'group-hover:shadow-cyan-500/30',
        icon: Box
      },
      // 默认样式
      'default': { 
        rank: 'R', 
        label: 'UTILITY',
        color: 'text-blue-600 dark:text-blue-400', 
        border: 'border-blue-500', 
        bg: 'bg-blue-50 dark:bg-blue-900/20', 
        shadow: 'group-hover:shadow-blue-500/30',
        icon: Wrench
      }
    };
    
    const style = map[tool.category] || map['default'];
    return { ...style, techLevel };
  }, [tool.category, index]);

  const Icon = config.icon;

  return (
    <Link
      to={tool.link}
      className="group relative block h-full no-underline hover:no-underline perspective-1000"
    >
      <div className="relative h-full transition-all duration-500 hover:-translate-y-2">
        {/* 悬停光晕 */}
        <div className={`absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500 bg-gradient-to-r from-cyan-500 to-blue-600`}></div>

        <div className="relative h-full bg-white dark:bg-[#1a1b26] rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-cyan-500/50 dark:group-hover:border-cyan-500/50 p-6 overflow-hidden flex flex-col">
          
          {/* 装饰：科技角标 */}
          <div className="absolute top-0 right-0 p-2">
             {tool.isNew && (
               <div className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800 animate-pulse">
                 <Sparkles className="w-3 h-3" />
                 NEW
               </div>
             )}
          </div>

          {/* Header: 图标 & 等级 */}
          <div className="flex justify-between items-start mb-5">
             {/* 左侧大图标容器 */}
             <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-sm border bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-gray-100 dark:border-gray-700 group-hover:scale-110 transition-transform relative overflow-hidden`}>
                {/* 如果数据中有 icon (emoji)，优先显示，否则显示默认 Icon */}
                {tool.icon ? (
                  <span className="z-10">{tool.icon}</span>
                ) : (
                  <Icon className={`w-7 h-7 z-10 ${config.color}`} />
                )}
                {/* 背景网格装饰 */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:4px_4px]"></div>
             </div>

             {/* 右侧：型号标识 */}
             <div className="flex flex-col items-end">
                <div className={`text-[10px] font-black uppercase tracking-widest ${config.color} opacity-60`}>
                  MODEL
                </div>
                <div className="text-xl font-mono font-bold text-gray-300 dark:text-gray-600 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
                  MK.{config.techLevel}
                </div>
             </div>
          </div>

          {/* Title & Desc */}
          <div className="mb-6 flex-1 relative z-10">
             <h3 className="text-xl font-bold mb-2 line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
               {tool.title}
             </h3>
             <p className="text-sm line-clamp-3 text-gray-500 dark:text-gray-400 leading-relaxed">
               {tool.description}
             </p>
          </div>

          {/* Tech Stats Bar (装饰性) */}
          <div className="flex items-center gap-2 mb-4 opacity-70">
            <div className="h-1.5 flex-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
               <div className={`h-full ${config.bg.replace('/20','')} w-[${(index % 4 + 2) * 20}%] rounded-full`}></div>
            </div>
            <span className="text-[10px] font-mono text-gray-400">SYS.READY</span>
          </div>

          {/* Action Button */}
          <div className="relative z-10 mt-auto">
             <div className="w-full py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-cyan-600 dark:group-hover:bg-cyan-400 dark:group-hover:text-white transition-all shadow-lg group-hover:shadow-cyan-500/30">
               <Cpu className="w-4 h-4" />
               启动工具
               <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
             </div>
          </div>
          
          {/* 背景装饰：电路板纹理 */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ 
                 backgroundImage: `linear-gradient(0deg, transparent 24%, #e5e7eb 25%, #e5e7eb 26%, transparent 27%, transparent 74%, #e5e7eb 75%, #e5e7eb 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #e5e7eb 25%, #e5e7eb 26%, transparent 27%, transparent 74%, #e5e7eb 75%, #e5e7eb 76%, transparent 77%, transparent)`,
                 backgroundSize: '30px 30px'
               }}>
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
          
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-300 rounded-lg text-xs font-bold uppercase tracking-widest shadow-sm">
                <Microscope className="w-3.5 h-3.5" />
                R&D Department Level 3
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
          
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
                   <ToolCard key={tool.id} tool={tool} index={idx} />
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