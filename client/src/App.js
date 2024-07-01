import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import PageNotFound from "./components/Pages/PageNotFound";
import Login from "./components/Pages/LoginPage";
import Signup from "./components/Pages/Signup";
import Offcanvas from "./components/Offcanvas";
import LoginPage from "./components/Pages/LoginPage";
import SignupPage from "./components/Pages/Signup";
import { ProductProvider } from './context/ProductContext';
import Cart from "./components/Pages/Cart";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./context/CartContext";
import ProductPage from "./components/Pages/ProductPage";
import Restaurant from "./components/Pages/Restaurant";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
        <ProductProvider>
          <Navbar />
          <Offcanvas />
          <LoginPage />
          <SignupPage />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/resturant/:id" element={<Restaurant />} />
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/cart" element={<Cart />}></Route>      
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
          <ToastContainer />
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
