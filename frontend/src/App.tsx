import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Register from "./components/Login&Register/Register";
import Login from "./components/Login&Register/Login";
import Home from "./components/Home";
import Product from "./components/Products/Product";
import Products from "./components/Products/Products";
import Dashboard from "./components/Profile/Dashboard";
import Addresses from "./components/Profile/Addresses";
import NewAddress from "./components/Profile/NewAddress";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Addresses" element={<Addresses />} />
          <Route path="/NewAddress" element={<NewAddress />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
