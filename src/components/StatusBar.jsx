import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Status from './Status'
import { Add } from '@mui/icons-material'

const StatusBar = () => {
  const {userList,currentUser} = useContext(AuthContext)
  return (
    <div className='status'>

      <div style={{position:"relative"}}>
        <Status item = {currentUser} />
        <span className='user-status-add'><Add style={{fontSize:"19px"}} /></span>
      </div>

    {userList.reverse().map(data => (
      <div style={{width:"max-content",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Status item = {data} borderClass='add-border' />
        {/* <p className='status-name'>{data.name}</p> */}
      </div>
    ))}
    </div>
  )
}

export default StatusBar
