import React from 'react';
import Link from '@docusaurus/Link';
import {
  Cloud, ChevronRight,
  Play, BookOpen, CheckCircle2, Lock,
  Sparkles, Target
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
              <div className="lg:w-40 shrink-0 flex flex-row lg:flex-col items-center justify-center gap-4 p-5 sm:p-6 lg:py-7 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/60 dark:from-gray-900 dark:via-gray-900 dark:to-slate-800/70">
                <div className="absolute inset-0 border-r border-slate-100/80 dark:border-slate-700/60" />
                <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-blue-200/20 dark:bg-blue-400/10 blur-2xl" />

                {/* 素材图标 */}
                <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt="stage-asset"
                      className={`w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-lg transition-transform duration-500 ${isLocked ? '' : 'group-hover/ticket:scale-110'}`}
                      style={{ imageRendering: isPixelArt ? 'pixelated' : 'auto' }}
                    />
                  ) : (
                    <Sparkles className="w-10 h-10 text-gray-300 dark:text-gray-600" />
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

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function RoadmapStages({ stages, assets = DEFAULT_ASSETS }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
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
  icon,
  stages = [],
}) {
  const totalStages = stages.length;
  const releasedStages = stages.filter(s => s.status === 'released' || s.status === 'ongoing').length;

  return (
    <div className="relative border-b border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white dark:from-[#111827] dark:via-[#0f172a] dark:to-[#0f172a]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className={`relative pt-8 md:pt-10 md:pb-12 ${icon ? 'pb-28 sm:pb-32' : 'pb-10'}`}>
          <div className="relative z-10">

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-5 max-w-4xl">
              {title}
            </h1>

            {subtitle && (
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mb-1 whitespace-pre-line">
                {subtitle}
              </p>
            )}

            {totalStages > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold bg-white/90 text-gray-700 dark:bg-gray-800/90 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-700 shadow-sm">
                  <Target size={14} />
                  {totalStages} 个阶段
                </span>
                {releasedStages > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/35 dark:text-emerald-300 ring-1 ring-emerald-200/80 dark:ring-emerald-800/70 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {releasedStages} 个已发布
                  </span>
                )}
                {totalStages > releasedStages && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold bg-amber-50 text-amber-700 dark:bg-amber-900/35 dark:text-amber-300 ring-1 ring-amber-200/80 dark:ring-amber-800/70 shadow-sm">
                    {totalStages - releasedStages} 个待更新
                  </span>
                )}
              </div>
            )}
          </div>

          {icon && (
            <div className="absolute bottom-4 right-2 sm:right-4 md:right-6 pointer-events-none select-none opacity-20 dark:opacity-15">
              {/\.(svg|png|jpg|jpeg|webp|gif)$/i.test(icon) ? (
                <img src={icon} alt="" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain" />
              ) : (
                <span className="text-7xl sm:text-8xl leading-none">{icon}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default { RoadmapHeader, RoadmapStages };
