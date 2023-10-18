import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import BasicHeader from './components/Header/BasicHeader/BasicHeader';
import Manufacturers from './components/Manufactures/Manufactures';
import Log from './components/LoginForm/LoginRegistrationBar';
import ProductList from './components/Products/ProductList';
function App() {
  return (
    <Router>
      <div className="App">
        <ProductList />
        <BasicHeader />
        <Routes>
          <Route path="/" element={<AppRouter />} />
          <Route path="/login" element={<Log />} />
          <Route path="/manufacturers/:categoryId" element={<Manufacturers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
