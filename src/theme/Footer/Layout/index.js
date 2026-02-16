import React from 'react'

export default function FooterLayout({ style, links, logo, copyright }) {
  return (
    <footer className="footer footer--dark">
      <div className="container container-fluid">
        {links}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && <div className="margin-bottom--sm">{logo}</div>}
            {copyright}
          </div>
        )}
      </div>
    </footer>
  )
}
