import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <div className="page-frame">
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="main">
          <div className="hero">
            <h1>Welcome to the Mobile Recharge App</h1>
            <p className="lead">Select a service from the sidebar.</p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
