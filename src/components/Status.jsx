import React from 'react'

const Status = ({item,borderClass}) => {
  return (
    <div className={`user-status ${borderClass}`}>
      <img src={item.photoURL} alt="" />
      {/* <div style={{fontSize:"10px"}}>{item.name}</div> */}
    </div>
  )
}

export default Status
