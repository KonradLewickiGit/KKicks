import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import Profile from '../../pages/profile/Profile'
import HomePage from '../../pages/home/Home'
import ProductDetails from '../../pages/ProductDetails/ProductDetails'
import LoggedHeader from '../../components/organism/Header/LoggedHeader'
import Order from '../../pages/order/Order'
import OrderFinal from '../../pages/orderFinal/orderFinal'
import AddProduct from '../../pages/addProduct/addProduct'
import QuestionForm from '../../pages/QuestionForm/QuestionForm'
import UserProfile from '../../pages/UserProfiles/UserProfile'
import ObservedProducts from '../../pages/observedProducts/ObservedProducts'
import ProductsByCategory from '../../components/molecules/ProductsByCategory/ProductsByCategory'

const AuthorizedApp: React.FC = () => {


  return (
    <>
      <LoggedHeader/>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/observedproducts" element={<ObservedProducts />} />
      <Route path="/productdetails/:id" element={<ProductDetails />} />
      <Route path="/order/:id" element={<Order />} />
      <Route path="/orderfinal/:id" element={<OrderFinal />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/questions" element={<QuestionForm />} />
      <Route path="/userprofile/:userId" element={<UserProfile />} />
      <Route path="/categories/:categoryId" element={<ProductsByCategory />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default AuthorizedApp
