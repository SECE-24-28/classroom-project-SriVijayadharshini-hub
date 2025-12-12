function Sidebar({ setPage }) {
  return (
    <aside className="w-64 bg-white/40 backdrop-blur-md h-screen shadow-md p-6">
      <h2 className=" text-3xl text-[#D4AF37] font-bold mb-4">Menu</h2>

      <ul className="space-y-2 text-lg font-bold">
        <li
          className="hover:bg-[#D4AF37] p-2 rounded cursor-pointer"
          onClick={() => setPage("home")}
        >
          Dashboard
        </li>

        <li
          className="hover:bg-[#D4AF37] p-2 rounded cursor-pointer"
          onClick={() => setPage("recharge")}
        >
          Recharge
        </li>

        <li
          className="hover:bg-[#D4AF37] p-2 rounded cursor-pointer"
          onClick={() => setPage("history")}
        >
          History
        </li>

        <li
          className="hover:bg-[#D4AF37] p-2 rounded cursor-pointer"
          onClick={() => setPage("profile")}
        >
          Profile
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
