import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";

import background from "/src/assets/background.avif";

function App() {
  const [page, setPage] = useState("home"); // home, recharge, history, contact, login, signup

  // 🔥 Recharge history state
  const [history, setHistory] = useState([]);

  // Trigger login
  const handleLoginClick = () => setPage("login");

  // On login success
  const handleLoginSuccess = () => setPage("home");

  // On signup success
  const handleSignupSuccess = () => setPage("login");

  // LOGIN PAGE
  if (page === "login") {
    return (
      <Login onSwitch={() => setPage("signup")} onLogin={handleLoginSuccess} />
    );
  }

  // SIGNUP PAGE
  if (page === "signup") {
    return (
      <Signup onSwitch={() => setPage("login")} onSignup={handleSignupSuccess} />
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Navbar */}
      <Navbar
        activePage={page}
        setActivePage={setPage}
        onLoginClick={handleLoginClick}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar setPage={setPage} />

        {/* Main Content */}
        <div className="flex-1 p-10 space-y-10">
          {/* HOME PAGE */}
          {page === "home" && (
            <>
              <div className="text-center text-gray-900">
                <h1 className="text-4xl font-bold">
                  Welcome to Mobile Recharge App
                </h1>
                <p className="mt-3 text-lg">
                  Select recharge options from the sidebar or choose your
                  operator below.
                </p>
              </div>

              {/* Operator Grid */}
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-8 shadow-xl">
                <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">
                  Select Your Operator
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <OperatorCard color="bg-red-500" icon="🟥" name="Airtel" />
                  <OperatorCard color="bg-blue-500" icon="🔵" name="Jio" />
                  <OperatorCard color="bg-purple-600" icon="🟣" name="Vi" />
                  <OperatorCard color="bg-blue-400" icon="🟦" name="BSNL" />
                </div>
              </div>

              <ContentCard
                title="About Our Recharge Service"
                content="Our mobile recharge platform provides fast and secure recharge services for all major telecom operators. You can instantly top-up your prepaid mobile, browse plans, and enjoy exclusive offers."
              />

              <ContentCard
                title="Popular Recharge Plans"
                content={
                  <ul className="list-disc ml-6 space-y-2">
                    <li>₹199 – 1.5GB/day + Unlimited Calls (28 days)</li>
                    <li>₹399 – 2GB/day + Unlimited Calls (56 days)</li>
                    <li>₹599 – 3GB/day + 100 SMS/day (84 days)</li>
                    <li>₹99 – Talktime + Local/National SMS</li>
                  </ul>
                }
              />

              <ContentCard
                title="Why Choose Us?"
                content={
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Safe & Secure Payments</li>
                    <li>Instant Recharge Confirmation</li>
                    <li>Best Deals & Cashback Offers</li>
                    <li>24/7 Customer Support</li>
                  </ul>
                }
              />
            </>
          )}

          {/* RECHARGE PAGE */}
          {page === "recharge" && (
            <ContentCard
              title="Mobile Recharge"
              content={
                <RechargeForm
                  onRecharge={(data) => {
                    setHistory((prev) => [...prev, data]); // 🔥 save recharge
                    setPage("history"); // redirect to history page
                  }}
                />
              }
            />
          )}

          {/* HISTORY PAGE */}
          {page === "history" && (
            <ContentCard
              title="Recharge History"
              content={<HistoryPage history={history} />}
            />
          )}

          {/* CONTACT PAGE */}
          {page === "contact" && (
            <ContentCard
              title="Contact Us"
              content="For support or inquiries, email us at support@rechargeapp.com."
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;

/* -------------------------------------------------------------------
                              Helper Components
------------------------------------------------------------------- */

function OperatorCard({ color, icon, name }) {
  return (
    <div
      className={`${color} flex flex-col items-center justify-center text-white rounded-xl p-6 cursor-pointer hover:scale-105 transition shadow-lg`}
    >
      <span className="text-5xl">{icon}</span>
      <p className="mt-3 text-lg font-semibold">{name}</p>
    </div>
  );
}

function ContentCard({ title, content }) {
  return (
    <div className="bg-white shadow-xl p-8 rounded-xl">
      <h3 className="text-2xl font-bold mb-3 text-purple-700">{title}</h3>
      <div className="text-gray-700 leading-relaxed">{content}</div>
    </div>
  );
}

/* -------------------------------------------------------------------
                             RECHARGE FORM
------------------------------------------------------------------- */

function RechargeForm({ onRecharge }) {
  const [mobile, setMobile] = useState("");
  const [operator, setOperator] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleRecharge = () => {
    if (mobile.length !== 10) {
      setError("Mobile number must be 10 digits.");
      return;
    }
    if (!operator) {
      setError("Please select an operator.");
      return;
    }
    if (!amount || amount < 10) {
      setError("Enter a valid recharge amount.");
      return;
    }

    setError("");

    const rechargeEntry = {
      mobile,
      operator,
      amount,
      date: new Date().toLocaleString(),
    };

    alert("Recharge Successful!");

    onRecharge(rechargeEntry);
  };

  return (
    <div className="space-y-5">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>
      )}

      <div>
        <label className="font-semibold">Mobile Number</label>
        <input
          type="number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter 10-digit mobile number"
          className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="font-semibold">Operator</label>
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select Operator</option>
          <option value="Airtel">Airtel</option>
          <option value="Jio">Jio</option>
          <option value="Vi">Vodafone Idea</option>
          <option value="BSNL">BSNL</option>
        </select>
      </div>

      <div>
        <label className="font-semibold">Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter recharge amount"
          className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        onClick={handleRecharge}
        className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
      >
        Recharge Now
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------
                           BEAUTIFUL HISTORY PAGE
------------------------------------------------------------------- */

function HistoryPage({ history }) {
  if (history.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl font-semibold text-gray-600">
          No recharge history available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {history.map((item, index) => (
        <div
          key={index}
          className="bg-purple-50 border border-purple-200 p-5 rounded-xl shadow-md"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-bold text-purple-700">
                {item.operator} Recharge
              </p>
              <p className="text-gray-700 mt-1">
                <strong>Mobile:</strong> {item.mobile}
              </p>
              <p className="text-gray-700">
                <strong>Amount:</strong> ₹{item.amount}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{item.date}</p>
              <span className="mt-2 inline-block bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
                Success
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
