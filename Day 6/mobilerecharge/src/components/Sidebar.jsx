import React from "react";

export default function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <h3 style={{ marginBottom: "1rem" }}>Menu</h3>
      <ul style={styles.ul}>
        <li>Home</li>
        <li>Recharge</li>
        <li>Plans</li>
        <li>History</li>
        <li>Profile</li>
      </ul>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    padding: "1rem",
    borderRight: "1px solid #ddd",
    height: "100vh",
    background: "#f5f8ff"
  },
  ul: {
    listStyle: "none",
    padding: 0,
    lineHeight: "2rem"
  }
};
