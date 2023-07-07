import React, { useContext, useEffect } from 'react'
import ChatListSingleUser from './ChatListSingleUser'
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../Firebase'
import { AuthContext } from '../context/AuthContext'

const ChatList = () => {
  const {id,setExpand,userList,setUserList,currentUser} = useContext(AuthContext)
  
  useEffect(()=>{
    async function fetchData(){
      // const q = query(collection(db,'users'),where("id" , "!=" , currentUser.uid), orderBy("id"),orderBy("time"))
      // const unsub = onSnapshot(q , (doc) => {
      //   const array = [];
      //   doc.forEach((data) => {array.push(data.data())});
      //   setUserList(array)
      // })
      // return () => {
      //   unsub()
      // }
      const snap = await getDocs(collection(db,'users'))
      const array = []
      snap.forEach(data => array.push(data.data()))
      const someData = array.filter(data => {
        return data.id !== id
      })
      setUserList(someData)
    }
   fetchData()
  },[id,setUserList,currentUser.uid])

  return (
    <div onClick={()=>setExpand(false)} className='chat-list'>
    {userList.map(item => (
      <ChatListSingleUser item = {item} />
    ))}
    </div>
  )
}

export default ChatList
