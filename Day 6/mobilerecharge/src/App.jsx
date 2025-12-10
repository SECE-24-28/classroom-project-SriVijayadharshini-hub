import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Plan from "./components/Plan";

function Layout() {
  return (
    <div style={layoutStyles.app}>
      <Navbar />
      <div style={layoutStyles.content}>
        <Sidebar />
        <main style={layoutStyles.main}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signin" element={<Signin />} />
        <Route path="plan" element={<Plan />} />
      </Route>
    </Routes>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to RechargeNow</h2>
      <p>Recharge your mobile quickly with secure payment options.</p>
    </div>
  );
}

const layoutStyles = {
  app: { display: "flex", flexDirection: "column", minHeight: "100vh" },
  content: { display: "flex", flex: 1 },
  main: { padding: "1.5rem", flex: 1 }
};