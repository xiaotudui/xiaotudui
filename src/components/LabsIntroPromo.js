import React, { useState, useRef, useEffect } from 'react';
import { QrCode, X } from 'lucide-react';

export default function LabsIntroPromo() {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block my-2">
      {/* Ultra Simple Text Link */}
      <button 
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors bg-transparent border-none p-0 cursor-pointer text-left"
      >
        <span className="underline decoration-blue-200 underline-offset-4 group-hover:decoration-blue-400 dark:decoration-blue-800/50 dark:group-hover:decoration-blue-500/80 leading-relaxed inline-block">
          面临申博毕业求职的大家是否还在为做不来SCI/CCF而苦恼？推荐你来找追梦AI，官方科研团队，QS前100 AI全方向2000位博导大牛全程把关，顶会选题+idea+方法论+debug+画图+写作+投稿一站式把关，感兴趣来戳。
        </span>
        <span className="shrink-0 scale-90 rounded-[3px] border border-blue-200/50 bg-blue-50/50 px-1 py-[1px] text-[10px] leading-none text-blue-400/80 dark:border-blue-800/30 dark:bg-blue-900/10 dark:text-blue-500/70 font-normal">
          广告
        </span>
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-[240px] origin-top-left transition-all duration-200 animate-in fade-in zoom-in-95">
          <div 
            ref={popoverRef}
            className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-800"
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="absolute right-2 top-2 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="text-center mt-1">
              
              <div className="mx-auto flex aspect-square w-40 items-center justify-center rounded-lg bg-gray-50 p-1.5 ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-700">
                {imgError ? (
                  <div className="text-center text-[10px] text-gray-500">
                    缺失二维码
                  </div>
                ) : (
                  <img
                    src="/img/zhuimeng-qcode.png"
                    alt=""
                    className="h-full w-full rounded object-contain"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
