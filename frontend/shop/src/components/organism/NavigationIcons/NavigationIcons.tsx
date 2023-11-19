import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ReactComponent as HouseIcon } from 'assets/icons/house-icon.svg'
import { ReactComponent as SearchIcon } from 'assets/icons/search-icon.svg'
import { ReactComponent as UserIcon } from 'assets/icons/user-icon.svg'
import { toggleSearching } from '../../../features/searchBarSlice'

const NavigationIcons: React.FC = () => {
  const dispatch = useDispatch()
  const handleClick = () => dispatch(toggleSearching())

  return (
    <>
      <Link to="/">
        <HouseIcon name="home" style={{ cursor: 'pointer' }} />
      </Link>
      <SearchIcon onClick={handleClick} name="search" style={{ cursor: 'pointer' }} />
      <Link to="profile">
        <UserIcon name="profile" style={{ cursor: 'pointer' }} />
      </Link>
    </>
  )
}

export default NavigationIcons
