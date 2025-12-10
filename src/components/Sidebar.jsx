function Sidebar({ onNavigate }) {
  return (
    <aside style={{ width: "180px", background: "#f5f5f5", padding: "15px" }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "10px", cursor: "pointer" }} onClick={() => onNavigate("home")}>Home</li>
        <li style={{ marginBottom: "10px", cursor: "pointer" }} onClick={() => onNavigate("login")}>Login</li>
        <li style={{ marginBottom: "10px", cursor: "pointer" }} onClick={() => onNavigate("signup")}>Sign Up</li>
        <li style={{ marginBottom: "10px" }}>Recharge</li>
        <li style={{ marginBottom: "10px" }}>Offers</li>
        <li style={{ marginBottom: "10px" }}>Support</li>
      </ul>
    </aside>
  );
}

export default Sidebar;
