import React from 'react'
import DOM from 'react-dom'
import './loader.css'

function LoaderHTML(props) {
  return <div className='loader'></div>
}

function Loader() {
  return (
    <>
      {DOM.createPortal(
        <LoaderHTML />,
        document.getElementById('loader')
      )}
    </>
  )
}

export default Loader
