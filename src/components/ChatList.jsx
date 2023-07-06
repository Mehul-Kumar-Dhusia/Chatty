import React, { useContext, useEffect } from 'react'
import ChatListSingleUser from './ChatListSingleUser'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../Firebase'
import { AuthContext } from '../context/AuthContext'

const ChatList = () => {
  const {id,setExpand,userList,setUserList} = useContext(AuthContext)
  
  useEffect(()=>{
    async function fetchData(){
      const snap = await getDocs(collection(db,'users'))
      const array = []
      snap.forEach(data => array.push(data.data()))
      const someData = array.filter(data => {
        return data.id !== id
      })
      setUserList(someData)
    }
   fetchData()
  },[id,setUserList])

  return (
    <div onClick={()=>setExpand(false)} className='chat-list'>
    {userList.map(item => (
      <ChatListSingleUser item = {item} />
    ))}
    </div>
  )
}

export default ChatList
