function Navbar() {
  return (
    <nav className="bg-purple-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Mobile Recharge</h1>

      <div className="flex items-center space-x-6">
        <a href="#" className="hover:text-gray-200">Home</a>
        <a href="#" className="hover:text-gray-200">Recharge</a>
        <a href="#" className="hover:text-gray-200">Contact</a>

        {/* LOGIN BUTTON */}
        <button className="bg-white text-gray-600 px-4 py-1 rounded hover:bg-gray-200">
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
