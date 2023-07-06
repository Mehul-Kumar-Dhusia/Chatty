import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Status from './Status'

const StatusBar = () => {
  const {userList} = useContext(AuthContext)
  return (
    <div className='status'>
    {userList.reverse().map(data => (
      <Status item = {data} />
    ))}
    </div>
  )
}

export default StatusBar
