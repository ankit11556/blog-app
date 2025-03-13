import { Container,Group,Title } from "@mantine/core";
import { Link } from "react-router-dom";
const Navbar = () =>{
  return (
<div className="bg-blue-600 w-full">
<Container className="w-full p-4">
<Group className="w-full flex justify-between items-center ">
  <Title >My Blog</Title>
<ul className="text-white p-2 flex space-x-16 ml-6 font-sans text-lg font-bold">
 <li>
  <Link to="/" className="hover:text-gray-300 cursor-pointer hover:underline">Home</Link>
 </li>
 <li>
  <Link to="/categories" className="hover:text-gray-300 cursor-pointer hover:underline">Categories</Link>
 </li>
 <li>
  <Link to="/about" className="hover:text-gray-300 cursor-pointer hover:underline">About</Link>
 </li>
 <li>
  <Link to="/signup" className="hover:text-gray-300 cursor-pointer hover:underline">Sign Up</Link>
 </li>
 <li>
  <Link to="/login" className="hover:text-gray-300 cursor-pointer hover:underline">Login</Link>
 </li>
</ul>
</Group>
</Container>
  </div>
  )
}

export default Navbar;