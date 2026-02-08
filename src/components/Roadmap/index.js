import React from 'react';
import Link from '@docusaurus/Link';
import {
  ArrowLeft, Cloud,
  Play, BookOpen, CheckCircle2, Lock,
  Sparkles, MapPin
} from 'lucide-react';

// --- 默认游戏素材 ---
const DEFAULT_ASSETS = {
  castle: '/img/game/Castle_Blue.png',
  tower: '/img/game/Tower_Blue.png',
  house: '/img/game/House_Blue.png',
  warrior: '/img/game/Warrior_Blue.gif',
  tree: '/img/game/tree.gif'
};

// --- 推荐度配置 ---
const IMPORTANCE_CONFIG = {
  must: { label: '必看', accent: '#c41e1e' },
  recommended: { label: '推荐', accent: '#1a6bb5' },
  optional: { label: '可选', accent: '#6b7280' },
};

// --- 制作状态配置 ---
const STATUS_CONFIG = {
  released: {
    label: '已完结',
    bg: 'bg-emerald-500',
    text: 'text-white',
    ringColor: 'ring-emerald-400/30',
    dotAnimate: false,
  },
  ongoing: {
    label: '正在更新',
    bg: 'bg-amber-500',
    text: 'text-white',
    ringColor: 'ring-amber-400/30',
    dotAnimate: true,
  },
  upcoming: {
    label: '未制作',
    bg: 'bg-gray-400',
    text: 'text-white',
    ringColor: 'ring-gray-400/20',
    dotAnimate: false,
  },
};

// --- 醒目状态徽章 ---
const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.upcoming;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black ${config.bg} ${config.text} ring-4 ${config.ringColor} shadow-sm`}>
      {config.dotAnimate && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
        </span>
      )}
      {!config.dotAnimate && status === 'released' && <CheckCircle2 size={10} />}
      {config.label}
    </span>
  );
};

// --- 方形印章（用于推荐度） ---
const SquareSeal = ({ text, color = '#c41e1e', rotate = -6 }) => (
  <div
    className="relative inline-flex items-center justify-center select-none px-3.5 py-1.5"
    style={{ transform: `rotate(${rotate}deg)`, color }}
  >
    <div className="absolute inset-0 border-[2.5px] border-current rounded-sm opacity-80" />
    <div className="absolute inset-[4px] border-[1.5px] border-current rounded-sm opacity-40" />
    <span className="relative text-sm font-black tracking-widest leading-none">
      {text}
    </span>
  </div>
);

const isAssetPath = (v) =>
  typeof v === 'string' && (v.startsWith('/') || v.startsWith('http') || /\.(svg|png|jpg|jpeg|gif|webp)$/i.test(v));

// --- 视频胶囊 ---
const VideoItem = ({ video }) => (
  <a
    href={video.link}
    target="_blank"
    rel="noopener noreferrer"
    className={`group/video inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold no-underline transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
      video.completed
        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-200 dark:ring-emerald-800'
        : 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50'
    }`}
  >
    {video.completed ? <CheckCircle2 size={13} /> : <Play size={12} className="ml-px" />}
    <span className="truncate max-w-[180px]">{video.title}</span>
  </a>
);

// --- 文档胶囊 ---
const DocItem = ({ doc }) => {
  const isExternal = doc.link?.startsWith('http');
  const LinkComponent = isExternal ? 'a' : Link;
  const linkProps = isExternal ? { href: doc.link, target: '_blank' } : { to: doc.link };
  return (
    <LinkComponent
      {...linkProps}
      className="group/doc inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold no-underline transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 ring-1 ring-purple-200 dark:ring-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50"
    >
      <BookOpen size={13} />
      <span className="truncate max-w-[180px]">{doc.title}</span>
    </LinkComponent>
  );
};

// --- 下载胶囊 ---
const DownloadChip = ({ item }) => (
  <a
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    className="group/dl inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold no-underline transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 ring-1 ring-amber-200 dark:ring-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/50"
  >
    <Cloud size={13} />
    <span className="truncate max-w-[180px]">{item.title}</span>
  </a>
);

// --- 锯齿边缘组件 ---
const ZigzagEdge = ({ position = 'top', className = '' }) => {
  const isHorizontal = position === 'top' || position === 'bottom';
  const size = 10;

  if (isHorizontal) {
    const flip = position === 'bottom';
    return (
      <div className={`absolute left-0 right-0 ${position === 'top' ? '-top-[9px]' : '-bottom-[9px]'} h-[10px] overflow-hidden ${className}`} aria-hidden="true">
        <svg width="100%" height={size} preserveAspectRatio="none" className="block">
          <defs>
            <pattern id={`zigzag-h-${position}`} width="20" height={size} patternUnits="userSpaceOnUse">
              {flip
                ? <polygon points={`0,0 10,${size} 20,0`} className="fill-white dark:fill-gray-900" />
                : <polygon points={`0,${size} 10,0 20,${size}`} className="fill-white dark:fill-gray-900" />
              }
            </pattern>
          </defs>
          <rect width="100%" height={size} fill={`url(#zigzag-h-${position})`} />
        </svg>
      </div>
    );
  }

  const flip = position === 'right';
  return (
    <div className={`absolute top-0 bottom-0 ${position === 'left' ? '-left-[9px]' : '-right-[9px]'} w-[10px] overflow-hidden ${className}`} aria-hidden="true">
      <svg width={size} height="100%" preserveAspectRatio="none" className="block">
        <defs>
          <pattern id={`zigzag-v-${position}`} width={size} height="20" patternUnits="userSpaceOnUse">
            {flip
              ? <polygon points={`0,0 ${size},10 0,20`} className="fill-white dark:fill-gray-900" />
              : <polygon points={`${size},0 0,10 ${size},20`} className="fill-white dark:fill-gray-900" />
            }
          </pattern>
        </defs>
        <rect width={size} height="100%" fill={`url(#zigzag-v-${position})`} />
      </svg>
    </div>
  );
};

// --- 主卡片组件（票据样式 - locked/unlocked 统一结构）---
const StageRow = ({ stage, index, isLast, assets }) => {
  const { isLocked, content } = stage;
  const impConfig = IMPORTANCE_CONFIG[stage.importance] || IMPORTANCE_CONFIG.optional;

  // 左侧素材
  const assetKey = stage.asset || 'castle';
  const imgSrc = isAssetPath(assetKey) ? assetKey : (assets || DEFAULT_ASSETS)[assetKey];
  const isPixelArt = typeof assetKey === 'string' && (assetKey === 'warrior' || /\.gif$/i.test(assetKey));

  // 右侧票根图片 - 支持自定义 stubAsset（可以是 assets key 或直接图片路径）
  const stubKey = stage.stubAsset || 'warrior';
  const stubSrc = isAssetPath(stubKey) ? stubKey : (assets || DEFAULT_ASSETS)[stubKey];
  const isStubPixelArt = typeof stubKey === 'string' && (stubKey === 'warrior' || /\.gif$/i.test(stubKey));

  return (
    <div className={`relative ${isLast ? '' : 'mb-10'}`}>
      <div className={`relative group/ticket mx-2 sm:mx-0 transition-transform duration-300 ${isLocked ? '' : 'hover:-translate-y-1'}`}>
        <div className="relative">
          {/* 锯齿边缘 */}
          <ZigzagEdge position="top" />
          <ZigzagEdge position="bottom" />
          <ZigzagEdge position="left" className="hidden lg:block" />
          <ZigzagEdge position="right" className="hidden lg:block" />

          {/* 票据主体 */}
          <div className={`bg-white dark:bg-gray-900 overflow-hidden lg:rounded-none rounded-xl transition-shadow duration-300 ${
            isLocked
              ? 'shadow-[0_2px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2)]'
              : 'shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] group-hover/ticket:shadow-[0_12px_40px_rgba(0,0,0,0.15)] dark:group-hover/ticket:shadow-[0_12px_40px_rgba(0,0,0,0.5)]'
          }`}>

            <div className={`flex flex-col lg:flex-row ${isLocked ? 'grayscale opacity-60' : ''}`}>

              {/* ===== 左侧：素材 + 状态 ===== */}
              <div className="lg:w-32 shrink-0 flex flex-row lg:flex-col items-center justify-center gap-3 p-4 sm:p-5 lg:py-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20z' fill='%23000' fill-opacity='.4'/%3E%3C/svg%3E")`,
                  backgroundSize: '20px 20px'
                }} />

                {/* 素材图标 */}
                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt="stage-asset"
                      className={`w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-lg transition-transform duration-500 ${isLocked ? '' : 'group-hover/ticket:scale-110'}`}
                      style={{ imageRendering: isPixelArt ? 'pixelated' : 'auto' }}
                    />
                  ) : (
                    <Sparkles className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                  )}
                </div>

                {/* 状态徽章 */}
                {stage.status && (
                  <div className="relative z-10">
                    <StatusBadge status={stage.status} />
                  </div>
                )}
              </div>

              {/* 左侧分割线 */}
              <div className="hidden lg:block w-px bg-gray-100 dark:bg-gray-800" />

              {/* ===== 内容区 ===== */}
              <div className="flex-1 relative">
                {/* 标题区 */}
                <div className="px-6 sm:px-8 pt-6 pb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className={`text-2xl sm:text-3xl font-black tracking-tight leading-tight ${isLocked ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                        {stage.title}
                      </h2>
                      <p className={`text-sm leading-relaxed mt-2 ${isLocked ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        {stage.desc}
                      </p>
                    </div>
                    {/* 推荐度方印 */}
                    <div className="shrink-0 mt-1">
                      <SquareSeal text={impConfig.label} color={isLocked ? '#9ca3af' : impConfig.accent} rotate={-6} />
                    </div>
                  </div>
                </div>

                {/* 分隔线 */}
                <div className="mx-6 sm:mx-8 border-t border-gray-100 dark:border-gray-800" />

                {/* 资源区 - 彩色胶囊流式布局 */}
                <div className={`px-6 sm:px-8 py-5 ${isLocked ? 'pointer-events-none select-none' : ''}`}>
                  <div className="flex flex-wrap gap-2.5">
                    {content?.videos?.map((v, i) => <VideoItem key={`v${i}`} video={v} />)}
                    {content?.docs?.map((d, i) => <DocItem key={`d${i}`} doc={d} />)}
                    {content?.downloads?.map((d, i) => <DownloadChip key={`dl${i}`} item={d} />)}
                  </div>
                </div>

                {/* 锁定提示浮层 */}
                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
                      <Lock size={14} className="text-gray-400" />
                      <span className="text-xs font-bold text-gray-500">未制作</span>
                    </div>
                  </div>
                )}
              </div>

              {/* ===== 撕边分割线 ===== */}
              <div className="hidden lg:flex relative w-0 items-stretch">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-[var(--ifm-background-color)]" />
                <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-px border-l-2 border-dashed border-gray-200 dark:border-gray-700" />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-[var(--ifm-background-color)]" />
              </div>
              <div className="lg:hidden relative h-0 mx-6">
                <div className="absolute top-1/2 -left-6 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[var(--ifm-background-color)]" />
                <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-px border-t-2 border-dashed border-gray-200 dark:border-gray-700" />
                <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[var(--ifm-background-color)]" />
              </div>

              {/* ===== 右侧：票根 - 自定义图片 ===== */}
              <div className="w-full lg:w-44 shrink-0 relative flex flex-col items-center justify-center py-8 sm:py-10 lg:py-6 px-6 lg:px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-sky-100/80 via-sky-50/60 to-emerald-50/80 dark:from-gray-800/80 dark:via-gray-850/60 dark:to-gray-900/80" />
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-emerald-200/30 to-transparent dark:from-emerald-900/15" />

                <div className="relative z-10 flex items-center justify-center">
                  {stubSrc ? (
                    <img
                      src={stubSrc}
                      alt=""
                      className={`w-24 h-24 sm:w-28 sm:h-28 lg:w-24 lg:h-24 object-contain drop-shadow-lg transition-transform duration-500 ${isLocked ? 'opacity-50' : 'group-hover/ticket:scale-110 group-hover/ticket:-translate-y-1'}`}
                      style={{ imageRendering: isStubPixelArt ? 'pixelated' : 'auto' }}
                    />
                  ) : (
                    <Sparkles className="w-12 h-12 text-gray-300" />
                  )}
                </div>

                <div className="mt-3 text-[7px] font-bold text-gray-400/50 dark:text-gray-600/50 tracking-[0.2em] uppercase text-center relative z-10">
                  Admit One
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function RoadmapStages({ stages, assets = DEFAULT_ASSETS }) {
  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-8">
      {stages.map((stage, index) => (
        <StageRow
          key={stage.id || index}
          stage={stage}
          index={index}
          isLast={index === stages.length - 1}
          assets={assets}
        />
      ))}
    </div>
  );
}

export function RoadmapHeader({
  title,
  subtitle,
  description,
  backLink = '/',
  backText = '返回首页',
  assets = DEFAULT_ASSETS,
  mascot = 'warrior'
}) {
  return (
    <div className="relative bg-white dark:bg-[#151b2d] border-b border-gray-200 dark:border-gray-800 pt-8 pb-12 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
        backgroundSize: '24px 24px'
      }} />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <Link to={backLink} className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors mb-8 no-underline group">
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
            <ArrowLeft size={16} />
          </div>
          {backText}
        </Link>

        <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-800">
                Roadmap
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-gray-400">
                <MapPin size={12} />
                Tudui Academy
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
              {title}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-3xl md:text-5xl mt-2">
                {subtitle}
              </span>
            </h1>

            {description && (
              <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed border-l-4 border-blue-200 dark:border-blue-800 pl-4">
                {description}
              </p>
            )}
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" />
            <img
              src={assets[mascot] || DEFAULT_ASSETS[mascot]}
              alt="mascot"
              className="relative w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default { RoadmapHeader, RoadmapStages };
