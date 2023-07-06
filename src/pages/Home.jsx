import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ChatSection from '../components/ChatSection'
import { AuthContext } from '../context/AuthContext'
import Profile from '../components/Profile'
import UserProfile from '../components/UserProfile'


const Home = () => {
  const {messageUser,visitProfile,userProfile} = useContext(AuthContext)
  return (
    <div className={`home ${messageUser && "mobile-chat-section"} ${userProfile && "mobile-user-profile"}` }>
      {visitProfile ? <Profile /> : <Sidebar />}
      <ChatSection />
      {userProfile && <UserProfile />}
    </div>
  )
}

export default Home
