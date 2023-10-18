import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Log from '../components/LoginForm/LoginRegistrationBar';
import Manufacturers from '../components/Manufactures/Manufactures';
import LoginForm from '../components/LoginForm/LoginForm';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/manufacturers" element={<Manufacturers />} />
      <Route path="/login" element={<Log />} />
    </Routes>
  );
};

export default AppRouter;
