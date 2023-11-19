import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

 import { GlobalStyle } from '../../assets/styles/GlobalStyle'
import { theme } from '../../assets/styles/theme'
import Header from '../../components/molecules/header/Header'
import Login from '../../pages/login/Login'
import Register from '../../pages/register/Register'
import { ThemeProvider } from 'styled-components'

const UnauthorizedApp: React.FC = () => {
  return (
    <>
       <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header isUnauthorizedApp>K&Kicks</Header>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default UnauthorizedApp
