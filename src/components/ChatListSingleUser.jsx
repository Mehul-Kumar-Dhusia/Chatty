import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../Firebase'

const ChatListSingleUser = ({item}) => {
  const {setMessageUser,setCombinedId,currentUser} = useContext(AuthContext)
  const [last , setLast] = useState('')
  useEffect(()=>{
    setLast(item.lastMessage)
  },[item])
  const clickHandler = async () => {
    setMessageUser(item)
    const cId = currentUser.uid > item.id ? currentUser.uid+item.id : item.id+currentUser.uid
    setCombinedId(cId)
    const res = await getDoc(doc(db,'chats',cId))

    if(!res.data()){
      setDoc(doc(db,'chats',cId),{
        message : []
      })
    }
  }
  return (
    <div onClick={clickHandler} className='chat-list-single-user'>
      <div className='chat-list-single-user-image'>
      <img src={item.photoURL} alt="" />
      </div>
      <div className='chat-list-single-user-info'>
         <div>{item.name}</div>
         <p style={{fontSize:"14px",color:"black",fontWeight:"300"}}>last message</p>
      </div>
    </div>
  )
}

export default ChatListSingleUser
