import React, { useContext } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <div className='navbar'>
      <span className="logo">Ishop Chat</span>
      <div className="user">
        <span>{currentUser.user?.firstname}</span>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  )
}

export default Navbar