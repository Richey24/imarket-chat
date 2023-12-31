import React, { useContext, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import Header from '../components/Header'
import { AuthContext } from '../context/AuthContext'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { askUserPermission, createNotificationSubscription, isPushNotificationSupported } from '../pushNotification'
// import "./Home.css"

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const notiSupported = isPushNotificationSupported()
  const hideImage = () => {
    document.getElementById("imageOverlay").classList.remove("showImg")
  }

  const handleNavigationDrawer = () => {
    alert('working')
  }

  useEffect(() => {
    if (currentUser) {
      noti()
    }
  }, [])

  const noti = async () => {
    if (notiSupported) {
      // await registerServiceWorker()
      const consent = await askUserPermission()
      if (consent === "granted") {
        const pushObject = await createNotificationSubscription()
        const res = await getDoc(doc(db, "userChats", currentUser.uid));
        Object.entries(res.data()).forEach(async (re) => {
          await updateDoc(doc(db, "userChats", re[1].userInfo.uid), {
            [re[0] + ".userInfo" + ".notification"]: JSON.stringify(pushObject),
          });
        })
      }
    }
  }

  return (
    <>
      <div className="dark">
        <Header />
        <div className="main-container " id="container">
          <div id="content" className="main-content">
            <div className="container">
              <div className="middle-content container-xxl p-0"></div>
              <div className="chat-section">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="chat-system">

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