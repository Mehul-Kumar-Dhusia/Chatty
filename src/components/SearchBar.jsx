import { ArrowBack } from '@mui/icons-material'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const SearchBar = () => {
  const {setSearchClick} = useContext(AuthContext)
  return (
    <div className='search-bar'>
      <ArrowBack onClick = {() => setSearchClick(false)} style={{marginLeft:"10px"}} />
      <input type="text" placeholder='Find User'/>
    </div>
  )
}

export default SearchBar
