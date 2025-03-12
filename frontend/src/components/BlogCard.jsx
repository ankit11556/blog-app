const BlogCard = ({ title, content, author }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md w-full md:w-[300px]">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600 mt-2">{content}</p>
      <p className="text-sm text-gray-500 mt-2">By {author}</p>
    </div>
  );
};

export default BlogCard;
