import { AccountCircle } from '@mui/icons-material'
import React from 'react'

const Status = ({item,borderClass}) => {
  return (
    <div className={`user-status ${item.photoURL && borderClass}`}>
      {item.photoURL ? <img src={item.photoURL} alt="" /> : <div><AccountCircle style={{color:"gray",width:"60px",height:"60px"}} /></div>}
      {/* <div style={{fontSize:"10px"}}>{item.name}</div> */}
    </div>
  )
}

export default Status
