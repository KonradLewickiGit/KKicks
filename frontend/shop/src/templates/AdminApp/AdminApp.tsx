import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Profile from '../../pages/profile/Profile';
import HomePage from '../../pages/home/Home';
import ProductDetails from '../../pages/ProductDetails/ProductDetails';
import AdminHeader from '../../components/organism/Header/AdminHeader'; // Zmiana na AdminHeader
import Order from '../../pages/order/Order';
import OrderFinal from '../../pages/orderFinal/orderFinal';
import AddProduct from '../../pages/addProduct/addProduct';
import Admin from '../../pages/adminPanel/Admin';
import ManageUsers from '../../components/organism/ManageUsers/ManageUsers';
import ManageProducts from '../../components/organism/ManageProducts/ManageProducts';
import OrdersPanel from '../../components/organism/OrdersPanel/OrdersPanel';
import ManageQuestions from '../../components/organism/ManageQuestions/ManageQuestions';
import UserProfile from '../../pages/UsersProfiles/UserProfile';

const AdminApp: React.FC = () => {
  return (
    <>
      <AdminHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/orderfinal/:id" element={<OrderFinal />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/orders" element={<OrdersPanel />} />
        <Route path="/admin/questions" element={<ManageQuestions />} />
        <Route path="/userprofile/:userId" element={<UserProfile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AdminApp;
