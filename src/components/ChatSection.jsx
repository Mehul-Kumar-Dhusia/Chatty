import React, { useContext } from 'react'
import MessageContainer from './MessageContainer'
import InputBar from './InputBar'
import ChatSectionTopBar from './ChatSectionTopBar'
import { AuthContext } from '../context/AuthContext'
import ImageUpload from './ImageUpload'

const ChatSection = () => {
  const {messageUser , setExpand,sendImage} = useContext(AuthContext)
  
  function clickHandler(){
    setExpand(false)
  }
  
  return (
    <div onClick={clickHandler} className={`chat-section ${!messageUser && "chat-nothing"} ${messageUser ? "mobile-chat-section" : ""}`}>
    {!messageUser && <div>
      Select a Chat to Message
    </div>}
    {messageUser &&
      <ChatSectionTopBar />
    }
    {messageUser && (
      sendImage ? <ImageUpload /> :
      <MessageContainer />
    )
    }
    {messageUser && (
      !sendImage &&
      <InputBar />
    )
    }
    </div>
  )
}
export default ChatSection
