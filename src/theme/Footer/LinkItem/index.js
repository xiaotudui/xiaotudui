/**
 * 自定义 Footer LinkItem，支持微信公众号二维码弹窗
 */
import React, { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import isInternalUrl from '@docusaurus/isInternalUrl'
import IconExternalLink from '@theme/Icon/ExternalLink'
import WeChatFooterPopover from '@site/src/components/WeChatFooterPopover'

export default function FooterLinkItem({ item }) {
  const { to, href, label, prependBaseUrlToHref, className, customType, ...props } = item

  // 微信公众号：渲染二维码弹窗而非普通链接
  if (customType === 'wechat') {
    return (
      <WeChatFooterPopover
        label={label}
        accountName={item.accountName || '我是土堆'}
        qrcodeImage={item.qrcodeImage || '/img/wechat-qrcode.jpg'}
        className={clsx('footer__link-item', className)}
      />
    )
  }

  const toUrl = useBaseUrl(to)
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true })
  return (
    <Link
        className={clsx('footer__link-item', className)}
        {...(href
          ? {
              href: prependBaseUrlToHref ? normalizedHref : href
            }
          : {
              to: toUrl
            })}
        {...props}
      >
        {label}
        {href && !isInternalUrl(href) && <IconExternalLink />}
      </Link>
  )
}
