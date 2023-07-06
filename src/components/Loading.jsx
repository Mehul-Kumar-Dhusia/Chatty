import React from 'react'
import {ThreeDots} from 'react-loader-spinner';
const Loading = () => {
  return (
    <div className='register-loading'>
      <h1>Chatty</h1>
      <ThreeDots color='white' />
    </div>
  )
}

export default Loading
