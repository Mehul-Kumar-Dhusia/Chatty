import React, { useContext } from 'react'
import Navbar from './Navbar'
import ChatList from './ChatList'
import { AuthContext } from '../context/AuthContext'
import StatusBar from './StatusBar'
import SearchBar from './SearchBar'

const Sidebar = () => {
  const {searchClick} = useContext(AuthContext)
  return (
    <div className='sidebar'>
      {searchClick && <SearchBar />}
      {!searchClick && <Navbar />}
      {!searchClick && <StatusBar />}
      <ChatList />
    </div>
  )
}

export default Sidebar
