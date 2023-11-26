import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import { RootState } from '../../app/store'
import Profile from '../../pages/profile/Profile'
import HomePage from '../../pages/home/Home'
import ProductDetails from '../../components/molecules/ProductDetails/ProductDetails'
import LoggedHeader from '../../components/organism/Header/LoggedHeader'
import Order from '../../pages/order/Order'

const AuthorizedApp: React.FC = () => {
  // const { isShowingSearchBar } = useSelector((state: RootState) => state.searchBar)

  return (
    <>
      {/* {isShowingSearchBar ? <SearchBar /> : <Header>K&Kicks</Header>} */}
      <LoggedHeader/>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/productdetails/:id" element={<ProductDetails />} />
      <Route path="/order/:id" element={<Order />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default AuthorizedApp
