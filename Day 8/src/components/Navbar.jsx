function Navbar({ activePage, setActivePage, onLoginClick }) {
  const menuItemClasses = (page) =>
    activePage === page
      ? "font-semibold border-b-2 border-white pb-1"
      : "hover:text-gray-300";

  return (
    <nav className="bg-purple-700 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold">Mobile Recharge</h1>

      <ul className="flex space-x-8 text-lg">
        <li
          className={`cursor-pointer ${menuItemClasses("home")}`}
          onClick={() => setActivePage("home")}
        >
          Home
        </li>

        <li
          className={`cursor-pointer ${menuItemClasses("recharge")}`}
          onClick={() => setActivePage("recharge")}
        >
          Recharge
        </li>

        <li
          className={`cursor-pointer ${menuItemClasses("contact")}`}
          onClick={() => setActivePage("contact")}
        >
          Contact
        </li>
      </ul>

      <button
        onClick={onLoginClick}
        className="bg-white text-purple-700 px-4 py-2 rounded-lg shadow hover:bg-gray-200"
      >
        Login
      </button>
    </nav>
  );
}

export default Navbar;
