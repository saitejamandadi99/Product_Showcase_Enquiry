import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './pages/mainPage/MainPage.jsx';
//import ProductDetails from './pages/ProductDetails/ProductDetails.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <h1>Welcome to the Product Enquiries Application</h1>

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<MainPage />} />

        {/* Product Details Page */}
        {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
