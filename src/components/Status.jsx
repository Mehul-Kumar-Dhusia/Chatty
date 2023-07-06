import React from 'react'

const Status = ({item}) => {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <img style={{height:"55px",width:"55px",borderRadius:"50%",objectFit:"cover"}} src={item.photoURL} alt="" />
      {/* <div style={{fontSize:"10px"}}>{item.name}</div> */}
    </div>
  )
}

export default Status
