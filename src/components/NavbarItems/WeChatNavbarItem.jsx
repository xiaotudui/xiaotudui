import React, { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'

export default function WeChatNavbarItem({
  accountName = '我是土堆',
  qrcodeImage = '/img/wechat-qrcode.png',
  className = 'header-wechat-link',
  position = 'right',
  label = '微信公众号',
  ...props
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
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  return (
    <div
      className="navbar__item"
      style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={clsx('navbar__link', className)}
        aria-label={label}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.25rem'
        }}
      />
      {isOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label={label}
          className="wechat-popover"
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '0.5rem',
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
                请添加 wechat-qrcode.png 到 static/img/
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
