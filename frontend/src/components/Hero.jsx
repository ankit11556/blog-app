import heroImg from "../assets/hero.jpg"
const Hero = () =>{
  return(
    <div className="w-full   flex gap-10 items-center rounded-lg shadow-xl bg-gray-100 p-6 m-6">
   <div className="w-1/2">
   <img className="w-ful max-h-[400px]object-cover rounded-lg shadow-lg" src={heroImg} alt="" />
   </div>
   <div className="w-1/2">
   <h1 className="text-4xl font-bold text-blue-700">Weocome to My Blog</h1>
   <p className="text-lg text-gray-600 mt-2">Discover amazing articles and stories that inspire and inform you.</p>
   <button className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-700 transition duration-300">
    Explore Blogs</button>
   </div>
    </div>
  )
}

export default Hero