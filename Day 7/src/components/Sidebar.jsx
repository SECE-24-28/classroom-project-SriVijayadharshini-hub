function Sidebar() {
  return (
    <aside className="w-64 bg-white-300 h-screen shadow-md p-6">
      <h2 className="text-lg font-bold mb-4">Menu</h2>

      <ul className="space-y-2">
        <li className="hover:bg-gray-200 p-2 rounded">Dashboard</li>
        <li className="hover:bg-gray-200 p-2 rounded">Recharge</li>
        <li className="hover:bg-gray-200 p-2 rounded">History</li>
        <li className="hover:bg-gray-200 p-2 rounded">Profile</li>
      </ul>
    </aside>
  );
}

export default Sidebar;
