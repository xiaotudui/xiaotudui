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
  tower: '/img/game/Tower_Blue.png',
  warrior: '/img/game/Warrior_Blue.gif',
};

// --- 组件：管理员 NPC ---
const ArchiveKeeper = () => {
  const [isTalking, setIsTalking] = useState(false);
  const [quote, setQuote] = useState("欢迎来到公会藏书馆。");
  
  const handlePoke = () => {
    setIsTalking(true);
    const quotes = [
      "知识就是暴击率！",
      "这本卷轴记载了上古算法...",
      "小心，别把咖啡洒在卷轴上！"
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setTimeout(() => setIsTalking(false), 3000);
  };

  return (
    <div className="relative h-64 w-full flex items-end justify-center perspective-1000 group/npc select-none">
      <div className="absolute bottom-2 left-1/4 -translate-x-1/2 group-hover/npc:-translate-y-2 transition-transform duration-500">
        <img src={ASSETS.tower} className="w-24 drop-shadow-2xl grayscale-[20%]" alt="Tower" />
      </div>
      <div className="relative z-10 cursor-pointer group" onClick={handlePoke}>
        {/* 对话气泡 */}
        <div className={`absolute -top-20 left-1/2 -translate-x-1/2 w-48 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-xl border-2 border-gray-200 dark:border-gray-700 transform transition-all duration-300 origin-bottom ${isTalking ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
          <p className="text-xs font-bold text-gray-700 dark:text-gray-300 text-center leading-relaxed">{quote}</p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-gray-800 border-b-2 border-r-2 border-gray-200 dark:border-gray-700 rotate-45"></div>
        </div>
        <img src={ASSETS.warrior} className="w-32 h-32 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-200" style={{ imageRendering: 'pixelated' }} alt="Warrior" />
      </div>
    </div>
  );
};

// --- 组件：知识任务卡片 ---
const KnowledgeQuestCard = ({ tutorial, index }) => {
  // 1. 映射配置
  const config = useMemo(() => {
    // 模拟数据：根据 index 生成难度 (1-5)
    // 实际项目中可以从 tutorial.difficulty 获取
    const difficulty = (index % 5) + 1; 
    
    // 难度对应的颜色和标签
    const difficultyConfig = {
      1: { color: 'text-green-500', label: '入门' },
      2: { color: 'text-blue-500', label: '简单' },
      3: { color: 'text-yellow-500', label: '中等' },
      4: { color: 'text-orange-500', label: '困难' },
      5: { color: 'text-red-500', label: '地狱' },
    }[difficulty] || { color: 'text-gray-500', label: '未知' };

    const map = {
      '基础': { rank: 'C', color: 'text-green-600 dark:text-green-400', border: 'border-green-500', bg: 'bg-green-50 dark:bg-green-900/20', icon: Scroll },
      '实战': { rank: 'A', color: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', icon: Sword },
      '理论': { rank: 'B', color: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', icon: GraduationCap },
      '框架': { rank: 'S', color: 'text-orange-500 dark:text-orange-400', border: 'border-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', icon: Shield },
    };
    
    const style = map[tutorial.category] || map['基础'];
    return { ...style, difficulty, diffInfo: difficultyConfig };
  }, [tutorial.category, index]);

  const Icon = config.icon;
  const xpReward = (parseInt(tutorial.duration) || 10) * 15;

  return (
    <Link
      to={tutorial.link}
      className="group relative block h-full no-underline hover:no-underline perspective-1000"
    >
      <div className="relative h-full transition-all duration-500 hover:-translate-y-2">
        {/* 悬停时的背景光晕 */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500"></div>

        <div className="relative h-full bg-white dark:bg-[#1a1b26] rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-blue-500/50 dark:group-hover:border-blue-500/50 p-6 overflow-hidden flex flex-col">
          {/* 装饰：顶部贴纸效果 */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-200/80 dark:bg-yellow-900/50 shadow-sm rotate-1 z-10 opacity-80 backdrop-blur-sm"></div>

          {/* Header: 图标 & Rank */}
          <div className="flex justify-between items-start mb-4">
             <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-sm border bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-gray-100 dark:border-gray-700 group-hover:scale-105 transition-transform">
                <Icon className={`w-7 h-7 ${config.color}`} />
             </div>

             <div className={`flex flex-col items-center justify-center w-10 h-12 border-2 rounded-lg font-black text-xl shadow-sm ${config.color} ${config.bg} ${config.border} bg-opacity-30 border-opacity-30`}>
                <span className="text-[8px] uppercase font-bold opacity-60 leading-none mt-1">Rank</span>
                <span className="leading-none">{config.rank}</span>
             </div>
          </div>

          {/* Title & Desc */}
          <div className="mb-6 flex-1 relative z-10">
             <h3 className="text-xl font-bold mb-2 line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
               {tutorial.title}
             </h3>
             <p className="text-sm line-clamp-2 text-gray-500 dark:text-gray-400">
               {tutorial.description}
             </p>
          </div>

          {/* Stats: Difficulty & Rewards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
             
             {/* 难度显示：使用骷髅头 + 文字标签 */}
             <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
               <span className="text-[10px] font-bold text-gray-400">难度</span>
               <div className="flex items-center gap-0.5">
                 {/* 渲染骷髅头 */}
                 {[...Array(5)].map((_, i) => (
                   <Skull 
                      key={i} 
                      className={`w-3 h-3 ${i < config.difficulty ? config.diffInfo.color : 'text-gray-200 dark:text-gray-700'}`} 
                      strokeWidth={3}
                   />
                 ))}
               </div>
             </div>

             {/* 奖励显示 */}
             <div className="flex items-center justify-end gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
               <Coins className="w-4 h-4 text-yellow-500" />
               <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                 {xpReward} XP
               </span>
             </div>
          </div>

          {/* Action Button */}
          <div className="relative z-10 mt-auto">
             <div className="w-full py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-blue-600 dark:group-hover:bg-blue-400 dark:group-hover:text-white transition-all shadow-lg group-hover:shadow-blue-500/30">
               <BookOpen className="w-4 h-4" />
               研读卷轴
               <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
             </div>
          </div>
          
          {/* 背景点阵纹理 */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
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
          
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-300 rounded-lg text-xs font-bold uppercase tracking-widest shadow-sm">
                <Crown className="w-3.5 h-3.5" />
                Guild Archives Level 5
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
                上古 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">知识卷轴</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-lg mx-auto md:mx-0 leading-relaxed">
                这里存放着公会历代勇者积累的智慧。
                <br/>
                目前已收录 <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-xl">{allDocs.length}</span> 份稀有技能书。
              </p>
            </div>
            <div className="relative h-64 flex items-end justify-center">
               <ArchiveKeeper />
            </div>
          </div>
        </div>

        {/* --- Main Content: 物品栏区域 --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
          
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
                
                <div className="flex items-center gap-2 px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-mono text-gray-500 dark:text-gray-400">
                  <Gem className="w-3 h-3" />
                  <span>SORT: RARITY</span>
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