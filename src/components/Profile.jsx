import { ArrowBack, Create } from '@mui/icons-material'
import React, { useContext } from 'react'
// import itachi from '../img/Itachi.jpg'
import { AuthContext } from '../context/AuthContext'

const Profile = () => { 
  const {setVisitProfile,currentUser} = useContext(AuthContext)
  return (
    <div className='profile'>
      <div className='profile-top-bar'>
        <ArrowBack onClick={()=> setVisitProfile(false)} style={{marginRight:"20px",cursor:"pointer"}} />
        <p>Profile</p>
      </div>
      <div className='profile-image'>
        <img src={currentUser.photoURL} alt="" />
      </div>

      <div className='profile-page-info'>
        <p className='profile-page-info-title'>Your name</p>
        <div>
            <p>{currentUser.displayName}</p>
            <Create className='pencil' />
        </div>
      </div>

      <div className='profile-page-info'>
        <p className='profile-page-info-title'>Description</p>
        <div>
            <p>Availabel</p>
            <Create className='pencil' />
        </div>
      </div>

    </div>
  )
}

export default Profile
