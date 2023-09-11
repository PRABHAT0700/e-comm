import { Routes, Route, useNavigate, createSearchParams } from "react-router-dom"

import NavBar from './components/navbar/navbar';
import Products from "./pages/products/products";
import { Product } from "./pages/product/product";
import { NotFound } from "./pages/not-found/not-found";
import { Cart } from "./pages/cart/cart";
import { useCart } from "./context/cart";

function App() {

  const navigate = useNavigate();  // ek page se dusre page me navigate karne ke liye maine useNavigate ka use kia hai
  const { cartItemCount } = useCart()

  const onSearch = (searchQuery) => {  // searchQuery ko mai props ke through navbar.js se access kar rha hu 
    navigate(`/?${createSearchParams({ q: searchQuery })}`)  // createSearchParams methods se mujhe har ek products pe jo user input me type kar rha hai usko ?q={user input} me convert kar deta hai
  }


  return (
    <>
      <NavBar onSearch={onSearch} cartItemCount={cartItemCount()}/>

      <Routes>
           <Route path="/" element={<Products />} />
           <Route path="/product/:productId" element={<Product />} />
           <Route path="/cart" element={<Cart />} />
           <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
