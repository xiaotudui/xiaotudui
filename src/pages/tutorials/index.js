import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { 
  Search, Filter, Sparkles, Clock, 
  Sword, Shield, Scroll, Zap, 
  Search as SearchIcon, X, Crown,
  GraduationCap, LayoutGrid, Gem,
  Trophy, Star, Coins, ArrowRight,
  BookOpen, Flame, Lock, Map, Menu,
  Skull, Signal
} from 'lucide-react';
import { tutorials } from '@site/src/data/tutorials-data';

// --- 资源素材 ---
const ASSETS = {
  arrow: '/img/game/arrow.gif',
};

// --- 组件：藏书馆守卫 NPC ---
const ArchiveKeeper = () => {
  const [isTalking, setIsTalking] = useState(false);
  const [quote, setQuote] = useState("这里是自由关卡模式，可以根据自己的喜欢，自由学习不同的教程");
  
  const handlePoke = () => {
    setIsTalking(true);
    const quotes = [
      "主线任务模式强调学习路径，这里更适合按兴趣自由探索。",
      "如果你不确定学什么，建议先去首页走主线任务模式。",
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setTimeout(() => setIsTalking(false), 3000);
  };

  return (
    <div className="relative h-64 w-full flex items-end justify-center perspective-1000 group/npc select-none">
      <div className="relative z-10 cursor-pointer group" onClick={handlePoke}>
        {/* 对话气泡 */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-56 bg-white dark:bg-gray-800 px-3 py-2 rounded-xl shadow-xl border-2 border-indigo-200 dark:border-indigo-800 transform transition-all duration-300 origin-bottom">
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 text-center leading-relaxed block">{quote}</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-gray-800 border-b-2 border-r-2 border-indigo-200 dark:border-indigo-800 rotate-45"></div>
        </div>
        <img src={ASSETS.arrow} className="w-52 h-52 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-200" style={{ imageRendering: 'pixelated' }} alt="Archive Keeper" />
      </div>
    </div>
  );
};

// --- 组件：知识任务卡片（收藏卡牌风格）---
const KnowledgeQuestCard = ({ tutorial, index }) => {
  const config = useMemo(() => {
    const difficulty = (index % 5) + 1;

    const diffConfig = {
      1: { label: '入门', color: '#22c55e' },
      2: { label: '简单', color: '#3b82f6' },
      3: { label: '中等', color: '#eab308' },
      4: { label: '困难', color: '#f97316' },
      5: { label: '地狱', color: '#ef4444' },
    }[difficulty];

    const catMap = {
      'PyTorch':  { icon: Flame,         colors: ['#f97316', '#ef4444'] },
      '目标检测': { icon: Signal,        colors: ['#8b5cf6', '#a855f7'] },
      '基础':     { icon: Scroll,        colors: ['#22c55e', '#14b8a6'] },
      '实战':     { icon: Sword,         colors: ['#a855f7', '#d946ef'] },
      '理论':     { icon: GraduationCap, colors: ['#3b82f6', '#6366f1'] },
      '框架':     { icon: Shield,        colors: ['#f59e0b', '#f97316'] },
    };

    const cat = catMap[tutorial.category] || catMap['基础'];
    return { ...cat, difficulty, diffInfo: diffConfig };
  }, [tutorial.category, index]);

  const Icon = config.icon;
  const xpReward = (parseInt(tutorial.duration) || 10) * 15;
  const gradient = `linear-gradient(135deg, ${config.colors[0]}, ${config.colors[1]})`;

  return (
    <Link to={tutorial.link} className="group relative block h-full no-underline hover:no-underline">
      <div className="relative h-full transition-all duration-500 ease-out hover:-translate-y-3">
        {/* 悬浮环境光 */}
        <div
          className="absolute -inset-3 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${config.colors[0]}25, transparent 70%)` }}
        />

        <div className="relative h-full bg-white dark:bg-[#1a1b26] rounded-2xl overflow-hidden flex flex-col shadow-[0_2px_15px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_15px_rgba(0,0,0,0.3)] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500 border border-gray-100 dark:border-gray-800 group-hover:border-transparent">

          {/* ═══ 顶部 Banner（支持自定义封面 / 默认渐变）═══ */}
          <div className="relative h-36 overflow-hidden" style={!tutorial.cover ? { background: gradient } : undefined}>
            {tutorial.cover ? (
              <>
                {/* 自定义封面图（bg-contain 确保完整显示） */}
                <div
                  className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${tutorial.cover})` }}
                />
              </>
            ) : (
              <>
                {/* 默认：菱形纹理 */}
                <div className="absolute inset-0 opacity-[0.07]" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20z' fill='%23fff'/%3E%3C/svg%3E")`,
                  backgroundSize: '24px 24px'
                }} />
                {/* 光效装饰 */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-black/5 rounded-full blur-2xl" />
                {/* 默认浮动图标 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-8 bg-white/5 rounded-full blur-2xl group-hover:bg-white/15 group-hover:scale-150 transition-all duration-700" />
                    <div className="relative w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Icon className="w-9 h-9 text-white drop-shadow-lg" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* 悬浮光扫效果 */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

            {/* 分类标签 - 左上 */}
            <div className="absolute top-3 left-3">
              <span className="px-2 py-0.5 rounded-md bg-black/20 backdrop-blur-sm text-white/90 text-[10px] font-bold tracking-wide border border-white/10">
                {tutorial.category || '基础'}
              </span>
            </div>

            {/* 底部弧形过渡 */}
            <div className="absolute -bottom-px left-0 right-0">
              <svg viewBox="0 0 400 20" preserveAspectRatio="none" className="w-full h-5 block">
                <path d="M0,20 Q200,0 400,20 L400,20 L0,20 Z" className="fill-white dark:fill-[#1a1b26]" />
              </svg>
            </div>
          </div>

          {/* ═══ 内容区 ═══ */}
          <div className="flex-1 flex flex-col px-5 pb-5 pt-1">
            <h3 className="text-lg font-black mb-1.5 line-clamp-2 text-gray-900 dark:text-gray-100">
              {tutorial.title}
            </h3>
            <p className="text-[13px] line-clamp-2 text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-4">
              {tutorial.description}
            </p>

            {/* 属性面板 */}
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 space-y-2.5 mb-4 border border-gray-100 dark:border-gray-700/50">
              {/* 难度 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Skull className="w-3 h-3 text-gray-400 dark:text-gray-500" strokeWidth={2.5} />
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-wide">难度</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-[3px]">
                    {[...Array(5)].map((_, i) => {
                      const isActive = i < config.difficulty;
                      return (
                        <div
                          key={i}
                          className={`w-5 h-1.5 rounded-full transition-all duration-500 ${isActive ? '' : 'bg-gray-200 dark:bg-gray-700'}`}
                          style={isActive ? { background: config.diffInfo.color, transitionDelay: `${i * 60}ms` } : undefined}
                        />
                      );
                    })}
                  </div>
                  <span className="text-[10px] font-bold min-w-[2em] text-right" style={{ color: config.diffInfo.color }}>
                    {config.diffInfo.label}
                  </span>
                </div>
              </div>

              {/* 奖励 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Coins className="w-3 h-3 text-gray-400 dark:text-gray-500" strokeWidth={2.5} />
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-wide">奖励</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-400" />
                  <span className="text-xs font-black text-yellow-600 dark:text-yellow-400">{xpReward} XP</span>
                </div>
              </div>
            </div>

            {/* 行动按钮 */}
            <div
              className="w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 group-hover:scale-[1.02] mt-auto"
              style={{ background: gradient, boxShadow: `0 4px 20px ${config.colors[0]}25` }}
            >
              <Flame className="w-4 h-4" />
              开始阅读
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function TutorialsIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  // 数据处理
  const allDocs = useMemo(() => tutorials.filter(t => t.type === 'doc' || t.type === 'article'), []);
  const categories = useMemo(() => ['全部', ...new Set(allDocs.map(t => t.category).filter(Boolean))], [allDocs]);

  const filteredDocs = allDocs.filter(doc => {
    const matchCategory = selectedCategory === '全部' || doc.category === selectedCategory;
    const matchSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <Layout title='土堆教程' description='土堆教程'>
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0c1222] font-sans selection:bg-indigo-500/30">
        
        {/* --- Hero: 藏书馆大厅 --- */}
        <div className="relative bg-white dark:bg-[#151b2d] border-b border-gray-200 dark:border-gray-800 pt-12 pb-24 overflow-hidden">
          {/* 魔法背景 */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="text-center md:text-left">
              <div className="inline-block px-5 py-2 mb-5 bg-yellow-400 text-black font-black text-sm md:text-base uppercase tracking-wider transform -rotate-1 shadow-sm rounded-md">
                自由关卡模式
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
                土堆 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">教程</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-lg mx-auto md:mx-0 leading-relaxed">
                自由关卡模式：你可以按兴趣自由挑选教程，不受主线顺序限制。
                <br/>
                目前已收录 <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-xl">{allDocs.length}</span> 份稀有历练任务。
                <br/>
                如果不知道从哪儿开始，可以试试主线任务模式 <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">主线任务</Link>。
              </p>
            </div>
            <div className="relative h-64 flex items-end justify-center">
               <ArchiveKeeper />
            </div>
          </div>
        </div>

        {/* --- Main Content: 物品栏区域 --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
          {/* 1. 响应式过滤器 (Responsive Loot Filter) */}
          <div className="bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-4 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
             
             {/* 分类筛选：桌面端 Tab / 移动端 Select */}
             <div className="w-full md:w-auto">
               
               {/* Mobile View: Select Dropdown */}
               <div className="md:hidden relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Filter className="h-4 w-4 text-gray-500" />
                 </div>
                 <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 text-base border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none font-bold shadow-sm"
                 >
                   {categories.map((cat) => (
                     <option key={cat} value={cat}>{cat}</option>
                   ))}
                 </select>
                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                   <Menu className="h-4 w-4 text-gray-500" />
                 </div>
               </div>

               {/* Desktop View: Tabs */}
               <div className="hidden md:flex items-center gap-2">
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg mr-2 shrink-0 border border-gray-200 dark:border-gray-700">
                   <Filter className="w-4 h-4 text-gray-500" />
                   <span className="text-xs font-bold text-gray-500 uppercase">Type</span>
                 </div>
                 {categories.map(cat => (
                   <button
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap border-2 ${
                       selectedCategory === cat 
                         ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-600 dark:text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
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
                  <SearchIcon className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="搜索技能名称..."
                  className="block w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
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

          {/* 2. 物品网格 (Inventory Grid) */}
          <div className="min-h-[400px] mb-20">
             {/* 状态栏 */}
             <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Inventory ({filteredDocs.length})</span>
                </div>
             </div>

             {/* Grid */}
             {filteredDocs.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 {filteredDocs.map((doc, idx) => (
                   <KnowledgeQuestCard key={idx} tutorial={doc} index={idx} />
                 ))}
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center py-24 text-center border-4 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl bg-gray-50/50 dark:bg-gray-800/20">
                 <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 animate-bounce">
                   <Search className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                 </div>
                 <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">未发现任何战利品</h3>
                 <p className="text-gray-500 font-medium max-w-xs mx-auto">尝试更换关键词，或者去其他副本（分类）看看？</p>
                 <button onClick={() => {setSearchQuery(''); setSelectedCategory('全部');}} className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-indigo-500/30">
                    重置过滤器
                 </button>
               </div>
             )}
          </div>
        </div>
      </div>
    </Layout>
  );
}