import { Container,Group,Title } from "@mantine/core";
const Navbar = () =>{
  return (
    <div className="bg-blue-600 w-full">
    <Container className="w-full p-4">
      <Group className="w-full flex justify-between items-center ">
        <Title >My Blog</Title>
        <ul className="text-white p-2 flex space-x-16 ml-6 font-sans text-lg font-bold">
        <li className="hover:text-gray-300 cursor-pointer hover:underline">Home</li>
        <li className="hover:text-gray-300 cursor-pointer hover:underline">Categories</li>
        <li className="hover:text-gray-300 cursor-pointer hover:underline">About</li>
        <li className="hover:text-gray-300 cursor-pointer hover:underline">Sign Up</li>
        <li className="hover:text-gray-300 cursor-pointer hover:underline">Login</li>
        </ul>
      </Group>
    </Container>
  </div>
  )
}

export default Navbar;