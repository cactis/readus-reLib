import React from 'react'
import ReactDOM from 'react-dom/client'

export const renderComponent = (component) => {
  let body = document.getElementsByTagName('body')[0]
  let span = document.createElement('wrapper')
  body.appendChild(span)
  const root = ReactDOM.createRoot(span)
  root.render(component)
}
