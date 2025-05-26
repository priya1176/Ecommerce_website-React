import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './api/Header';
import Footer from './api/Footer';
import Checkout from './api/Checkout';
import Payment from './api/Payment';

const Dashboard = lazy(() => import('./api/Dashbord'));
const Cart = lazy(() => import('./api/Cart'));
const Wishlist = lazy(() => import('./api/Wishlist'));
const ProfileForm = lazy(() => import('./api/ProfileForm'));
const AboutPage = lazy(() => import('./api/AboutPage'));
const Categories = lazy(() => import('./api/Categories'));
const NotificationPage = lazy(() => import('./api/NotificationPage'));
const ShopByCategory = lazy(() => import('./api/ShopByCategory'));
const ProductList = lazy(() => import('./api/ProductList'));
const SignUp = lazy(() => import('./api/Signup'));
const Api = lazy(() => import('./api/Api'));
const ProductDetail = lazy(() => import('./api/ProductDetail'));

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header cartCount={JSON.parse(localStorage.getItem('cart'))?.length || 0} />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />

            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/account" element={<ProfileForm />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/shop" element={<ShopByCategory />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products" element={<Api />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
