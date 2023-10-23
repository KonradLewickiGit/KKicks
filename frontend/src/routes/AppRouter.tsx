import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Log from '../components/LoginForm/LoginRegistrationBar';
import Manufacturers from '../components/Manufactures/Manufactures';
import RegisterForm from '../components/RegisterForm/RegisterForm';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Log />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/manufacturers/:categoryId" element={<Manufacturers />} />
    </Routes>
  );
};

export default AppRouter;
