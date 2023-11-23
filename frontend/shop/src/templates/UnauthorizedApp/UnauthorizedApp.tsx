import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

 import { GlobalStyle } from '../../assets/styles/GlobalStyle'
import { theme } from '../../assets/styles/theme'
import Login from '../../pages/login/Login'
import Register from '../../pages/register/Register'
import HomePage from '../../pages/home/Home'
import { ThemeProvider } from 'styled-components'
import ProductDetails from '../../components/molecules/ProductDetails/ProductDetails'
import GuestHeader from '../../components/organism/Header/GuestHeader'

const UnauthorizedApp: React.FC = () => {
  return (
    <>
       <ThemeProvider theme={theme}>
        <GlobalStyle />
        <GuestHeader/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productdetails/:id" element={<ProductDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default UnauthorizedApp
