function Navbar({ activePage, setActivePage, onLoginClick, isLoggedIn }) {
  const menuItemClasses = (page) =>
    activePage === page
      ? "font-semibold border-b-2 border-white pb-1"
      : "hover:text-white-600";

  return (
    <nav className="bg-[#D4AF37] text-black px-8 py-4 flex justify-between items-center shadow-lg">
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

      {/* Show Login button ONLY if the user is NOT logged in */}
      {!isLoggedIn && (
        <button
          onClick={onLoginClick}
          className="bg-black text-[#D4AF37] px-4 py-2 rounded-lg shadow hover:bg-gray-200"
        >
          Login
        </button>
      )}
    </nav>
  );
}

export default Navbar;
