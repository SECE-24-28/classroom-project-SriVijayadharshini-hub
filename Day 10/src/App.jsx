import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminDashboard from "./components/AdminDashboard";

// Pages
import HomePage from "./pages/HomePage";
import PlansPage from "./pages/PlansPage";
import RechargePage from "./pages/RechargePage";
import HistoryPage from "./pages/HistoryPage";
import ContactPage from "./pages/ContactPage";

function App() {
  const [page, setPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState("");
  const [history, setHistory] = useState([]);
  const [userName, setUserName] = useState("");

  const handleLoginClick = () => setPage("login");

  const handleLoginSuccess = (email, name = "User") => {
    setIsLoggedIn(true);
    setUserName(name);
    
    // Detect admin based on email
    if (email.includes('@admin.com') || email === 'admin@rechargeapp.com') {
      setIsAdmin(true);
      setPage("admin");
    } else {
      setIsAdmin(false);
      setPage("home");
    }
  };

  const handleSignupSuccess = (email, name = "User", accountType = "user") => {
    setIsLoggedIn(true);
    setUserName(name);
    
    // Set admin status based on accountType
    if (accountType === "admin") {
      setIsAdmin(true);
      setPage("admin");
    } else {
      setIsAdmin(false);
      setPage("home");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName("");
    setPage("home");
  };

  const switchToSignup = () => setPage("signup");
  const switchToLogin = () => setPage("login");

  // LOGIN PAGE
  if (page === "login") {
    return (
      <Login 
        onSwitch={switchToSignup} 
        onLogin={handleLoginSuccess}
      />
    );
  }

  // SIGNUP PAGE
  if (page === "signup") {
    return (
      <Signup 
        onSwitch={switchToLogin} 
        onSignup={handleSignupSuccess}
      />
    );
  }

  // ADMIN DASHBOARD
  if (isAdmin) {
    return <AdminDashboard onLogout={handleLogout} userName={userName} />;
  }

  // USER DASHBOARD (Regular User Interface)
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      <div className="relative z-10">
        <Navbar
          activePage={page}
          setActivePage={setPage}
          onLoginClick={handleLoginClick}
          isLoggedIn={isLoggedIn}
          userName={userName}
          onLogout={handleLogout}
          theme="dark"
        />

        <div className="flex">
          <Sidebar setPage={setPage} isLoggedIn={isLoggedIn} theme="dark" />

          <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
            
            {/* WELCOME MESSAGE */}
            {isLoggedIn && page === "home" && (
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-white p-5 md:p-6 rounded-xl shadow-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center mr-4 border border-gray-600">
                    <span className="text-lg">👋</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      Welcome back, {userName}!
                    </h2>
                    <p className="text-gray-300 text-sm md:text-base">
                      Ready to recharge? Choose from our exclusive plans below.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE ROUTING */}
            {page === "home" && (
              <HomePage 
                setSelectedOperator={setSelectedOperator}
                setPage={setPage}
              />
            )}

            {page === "plans" && (
              <div className="animate-fadeIn">
                <PlansPage
                  operator={selectedOperator}
                  isLoggedIn={isLoggedIn}
                  onSelectPlan={({ price, operator }) => {
                    setSelectedOperator(operator);
                    setSelectedAmount(price);
                    setPage("recharge");
                  }}
                />
              </div>
            )}

            {page === "recharge" && (
              <div className="animate-fadeIn">
                <RechargePage
                  presetAmount={selectedAmount}
                  presetOperator={selectedOperator}
                  onRecharge={(data) => {
                    setHistory((prev) => [...prev, data]);
                    setSelectedAmount("");
                    setPage("history");
                  }}
                />
              </div>
            )}

            {page === "history" && (
              <div className="animate-fadeIn">
                <HistoryPage history={history} />
              </div>
            )}

            {page === "contact" && (
              <div className="animate-fadeIn">
                <ContactPage />
              </div>
            )}

          </main>
        </div>

        <Footer theme="dark" />
      </div>
    </div>
  );
}

export default App;