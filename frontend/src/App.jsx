import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
// import BlogSection from "./components/BlogSection"
import {Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import About from "./Pages/About";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";

function App() {
  

  return (
    <>
     
     <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/categories" element={<Categories />} />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
     
    </>
  )
}

export default App
