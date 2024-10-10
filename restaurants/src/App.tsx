import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Api from './api/Api'; // Your products list component
import ProductDetail from './api/ProductDetail' // Your product detail component
import Header from './api/Header'
import Footer from './api/Footer'
import Dashboard from './api/Dashbord'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <Router> 
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} /> {/* Main dashboard route */}
          <Route path="/products" element={<Api />} /> {/* Products list */}
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;


