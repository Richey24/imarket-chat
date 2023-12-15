import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import Header from '../components/Header'
// import "./Home.css"

const Home = () => {
  const hideImage = () => {
    document.getElementById("imageOverlay").classList.remove("showImg")
  }

  return (
    <>
    <div className="dark">
      <Header />
      <div className="main-container " id="container">
          <div id="content" className="main-content">
              <div>
                    <div className="middle-content container-xxl p-0"></div>
                    <div className="chat-section">
                          <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12">
                              <div className="chat-system">
                                
                                    {/* Hamburger Icon */}
                                    <div className="hamburger">
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                        width="24" height="24" viewBox="0 0 24 24" 
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                                        class="feather feather-menu mail-menu d-lg-none">
                                          <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
                                      </svg>
                                    </div>
                                    {/*  */}

                                    <Sidebar />
                                
                                    <Chat />
                              </div>
                            </div>
                          </div>
                    </div>
              </div>
          </div>

      {/* <div class="overlay"></div>
      <div class="cs-overlay"></div>
      <div class="search-overlay"></div> */}

    
        {/* <div class="chat-section layout-top-spacing">
            <Sidebar />
        </div> */}

          {/* <Chat />
          <div id='imageOverlay' className='imageOverlay'>
            <button onClick={hideImage}>Close</button>
            <img id='theImage' src="" alt="" />
          </div>
        </div> */}
      </div>
    </div>
    </>
  )
}

export default Home