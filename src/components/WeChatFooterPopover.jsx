import React, { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'

/**
 * 底部页脚微信公众号二维码弹窗组件
 * 点击显示二维码，弹窗在链接上方（因 footer 在页面底部）
 */
export default function WeChatFooterPopover({
  label = '微信公众号',
  accountName = '我是土堆',
  qrcodeImage = '/img/wechat-qrcode.jpg',
  className
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [imgError, setImgError] = useState(false)
  const popoverRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }
    function handleScroll() {
      setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      window.addEventListener('scroll', handleScroll, { passive: true })
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isOpen])

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        ref={triggerRef}
        type="button"
        className={clsx(className)}
        aria-label={label}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={(e) => {
          e.preventDefault()
          setIsOpen(!isOpen)
        }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          font: 'inherit',
          color: 'inherit'
        }}
      >
        {label}
      </button>
      {isOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label={label}
          className="wechat-popover wechat-footer-popover"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '0.5rem',
            padding: '1rem 1.25rem',
            background: 'var(--ifm-background-surface-color, #fff)',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            border: '1px solid var(--ifm-color-emphasis-200, #eee)',
            zIndex: 1000,
            minWidth: '200px',
            textAlign: 'center'
          }}
        >
          {/* <div
            style={{
              fontWeight: 600,
              fontSize: '1rem',
              marginBottom: '0.75rem',
              color: 'var(--ifm-font-color-base)'
            }}
          >
            {accountName}
          </div> */}
          <div
            style={{
              width: '140px',
              height: '140px',
              margin: '0 auto',
              background: '#fff',
              borderRadius: '8px',
              padding: '8px',
              border: '1px solid var(--ifm-color-emphasis-200, #eee)'
            }}
          >
            {imgError ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: 'var(--ifm-color-emphasis-600)',
                  fontSize: '12px'
                }}
              >
                请添加 wechat-qrcode.jpg 到 static/img/
              </div>
            ) : (
              <img
                src={qrcodeImage}
                alt="微信公众号二维码"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
                onError={() => setImgError(true)}
              />
            )}
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--ifm-color-emphasis-600)',
              marginTop: '0.5rem'
            }}
          >
            交个朋友
          </div>
        </div>
      )}
    </div>
  )
}
