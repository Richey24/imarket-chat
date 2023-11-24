import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import "./Home.css"

const Home = () => {
  const hideImage = () => {
    document.getElementById("imageOverlay").classList.remove("showImg")
  }
  return (
    <div className='home'>
      <div className="container">
        <Sidebar />
        <Chat />
        <div id='imageOverlay' className='imageOverlay'>
          <button onClick={hideImage}>Close</button>
          <img id='theImage' src="" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Home