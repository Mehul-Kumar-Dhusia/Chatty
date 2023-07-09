import { ArrowBack } from '@mui/icons-material'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'


const UserProfile = () => {
    const {setUserProfile,messageUser} = useContext(AuthContext)
    return (
        <div className='profile'>
        <div className='profile-top-bar'>
            <ArrowBack onClick={()=> setUserProfile(false)} style={{marginRight:"20px",cursor:"pointer"}} />
            <p>Profile</p>
        </div>
        <div className='profile-image'>
            <img src={messageUser.photoURL} alt="" />
        </div>

        <div className='profile-page-info'>
            <p className='profile-page-info-title'>User name</p>
            <div>
                <p>{messageUser.name}</p>
                {/* <Create className='pencil' /> */}
            </div>
        </div>

        <div className='profile-page-info'>
            <p className='profile-page-info-title'>Description</p>
            <div>
                <p>Availabel</p>
                {/* <Create className='pencil' /> */}
            </div>
        </div>

        </div>
    )
}

export default UserProfile
