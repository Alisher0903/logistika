import { Route, Routes } from "react-router-dom";
import Login from './components/login';
import User from './components/user';
import Product from './components/product';
import About from "./components/about-me/About";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </>
  )
}

export default App;