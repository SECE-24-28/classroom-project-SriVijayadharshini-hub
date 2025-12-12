import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";

import background from "/src/assets/background.jpg";

// LOGOS
import AirtelLogo from "./assets/logos/Airtel.jpg";
import JioLogo from "./assets/logos/Jio.png";
import ViLogo from "./assets/logos/VI Vodafone Idea.png";
import BSNLLogo from "./assets/logos/BSNL-logo.png";

import slide1 from "./assets/slide1.png";
import slide2 from "./assets/slides2.png";
import slide3 from "./assets/slide3.png";

/* -----------------------------------------------------------
   IMAGE SLIDESHOW COMPONENT
----------------------------------------------------------- */
function ImageSlider() {
  const slides = [slide1, slide2, slide3];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-xl relative">
      {slides.map((src, i) => (
        <img
          key={i}
          src={src}
          alt="slide"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

/* -----------------------------------------------------------
   MAIN APP
----------------------------------------------------------- */
function App() {
  const [page, setPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectedOperator, setSelectedOperator] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState("");

  const [history, setHistory] = useState([]);

  const handleLoginClick = () => setPage("login");

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setPage("home");
  };

  const handleSignupSuccess = () => setPage("login");

  // LOGIN PAGE
  if (page === "login") {
    return (
      <Login
        onSwitch={() => setPage("signup")}
        onLogin={handleLoginSuccess}
      />
    );
  }

  // SIGNUP PAGE
  if (page === "signup") {
    return (
      <Signup
        onSwitch={() => setPage("login")}
        onSignup={handleSignupSuccess}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm scale-105"
        style={{ backgroundImage: `url(${background})` }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10">

        <Navbar
          activePage={page}
          setActivePage={setPage}
          onLoginClick={handleLoginClick}
          isLoggedIn={isLoggedIn}
        />

        <div className="flex">
          <Sidebar setPage={setPage} />

          {/* MAIN CONTENT */}
          <div className="flex-1 p-10 space-y-10">

            {/* HOME PAGE */}
            {page === "home" && (
              <>
                {/* Welcome Title */}
                <div className="text-center text-[#D4AF37]">
                  <h1 className="text-4xl font-bold text-[#ffd978]
                    drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]
                    drop-shadow-[0_0_16px_rgba(255,215,0,0.6)]
                    drop-shadow-[0_0_24px_rgba(255,215,0,0.4)]">
                    Welcome to Mobile Recharge App
                  </h1>

                  <p className="mt-3 text-lg">
                    Select recharge options from the sidebar or choose your operator below.
                  </p>
                </div>

                {/* IMAGE SLIDESHOW */}
                <ImageSlider />

                {/* OPERATOR SELECTION */}
                <div className="bg-white/70 backdrop-blur-md rounded-xl p-8 shadow-xl">
                  <h2 className="text-3xl font-bold mb-6 text-black text-center">
                    Select Your Operator
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <OperatorCard
                      color="bg-[#D4AF37]"
                      logo={AirtelLogo}
                      name="Airtel"
                      onClick={() => {
                        setSelectedOperator("Airtel");
                        setPage("plans");
                      }}

                      
                    />

                    <OperatorCard
                      color="bg-[#D4AF37]"
                      logo={JioLogo}
                      name="Jio"
                      onClick={() => {
                        setSelectedOperator("Jio");
                        setPage("plans");
                      }}
                    />

                    <OperatorCard
                      color="bg-[#D4AF37]"
                      logo={ViLogo}
                      name="Vi"
                      onClick={() => {
                        setSelectedOperator("Vi");
                        setPage("plans");
                      }}
                    />

                    <OperatorCard
                      color="bg-[#D4AF37]"
                      logo={BSNLLogo}
                      name="BSNL"
                      onClick={() => {
                        setSelectedOperator("BSNL");
                        setPage("plans");
                      }}
                    />
                  </div>
                </div>

                <ContentCard
                  title="About Our Recharge Service"
                  content="Our mobile recharge platform provides fast and secure recharge services for all major telecom operators."
                />

                <ContentCard
                  title="Popular Recharge Plans"
                  content={
                    <ul className="list-disc ml-6 space-y-2">
                      <li>₹199 – 1.5GB/day • 28 days</li>
                      <li>₹399 – 2GB/day • 56 days</li>
                      <li>₹599 – 3GB/day • 84 days</li>
                    </ul>
                  }
                />
              </>
            )}

            {/* PLANS PAGE */}
            {page === "plans" && (
              <PlanPage
                operator={selectedOperator}
                onSelectPlan={({ price, operator }) => {
                  setSelectedOperator(operator);
                  setSelectedAmount(price);
                  setPage("recharge");
                }}
              />
            )}

            {/* RECHARGE PAGE */}
            {page === "recharge" && (
              <ContentCard
                title="Mobile Recharge"
                content={
                  <RechargeForm
                    presetAmount={selectedAmount}
                    presetOperator={selectedOperator}
                    onRecharge={(data) => {
                      setHistory((prev) => [...prev, data]);
                      setSelectedAmount("");
                      setPage("history");
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
                content="For support, email us at support@rechargeapp.com."
              />
            )}

          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;

/* -----------------------------------------------------------
   OPERATOR CARD
----------------------------------------------------------- */
function OperatorCard({ color, logo, name, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${color} flex flex-col items-center justify-center text-white rounded-xl p-6 cursor-pointer hover:scale-105 transition shadow-lg`}
    >
      <img
        src={logo}
        alt={name}
        className="w-16 h-16 object-contain rounded-lg bg-white p-2"
      />
      <p className="mt-3 text-lg font-semibold">{name}</p>
    </div>
  );
}

/* -----------------------------------------------------------
   CONTENT CARD
----------------------------------------------------------- */
function ContentCard({ title, content }) {
  return (
    <div className="bg-white/70 backdrop-blur-md shadow-xl p-8 rounded-xl">
      <h3 className="text-2xl font-bold mb-3 text-black">{title}</h3>
      <div className="text-white leading-relaxed">{content}</div>
    </div>
  );
}

/* -----------------------------------------------------------
   PLAN PAGE
----------------------------------------------------------- */
function PlanPage({ operator, onSelectPlan }) {
  const plans = {
    Airtel: [
      { price: 199, desc: "1.5GB/day • 28 days" },
      { price: 399, desc: "2GB/day • 56 days" },
      { price: 599, desc: "3GB/day • 84 days" },
    ],
    Jio: [
      { price: 209, desc: "1.5GB/day • 28 days" },
      { price: 444, desc: "2GB/day • 56 days" },
      { price: 666, desc: "1.5GB/day • 84 days" },
    ],
    Vi: [
      { price: 199, desc: "1GB/day • 28 days" },
      { price: 479, desc: "1.5GB/day • 56 days" },
      { price: 839, desc: "2GB/day • 84 days" },
    ],
    BSNL: [
      { price: 147, desc: "10GB Data • 30 days" },
      { price: 247, desc: "2GB/day • 30 days" },
      { price: 397, desc: "Unlimited calls • 60 days" },
    ],
  };

  return (
    <ContentCard
      title={`${operator} Recharge Plans`}
      content={
        <div className="space-y-4">
          {plans[operator].map((p, index) => (
            <div key={index} className="flex justify-between p-4 bg-yellow-100 rounded-lg text-black">
              <div>
                <p className="font-bold text-black">₹{p.price}</p>
                <p>{p.desc}</p>
              </div>

              <button
                className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg hover:bg-black"
                onClick={() => onSelectPlan({ price: p.price, operator })}
              >
                Recharge
              </button>
            </div>
          ))}
        </div>
      }
    />
  );
}

/* -----------------------------------------------------------
   RECHARGE FORM
----------------------------------------------------------- */
function RechargeForm({ onRecharge, presetAmount, presetOperator }) {
  const [mobile, setMobile] = useState("");
  const [operator, setOperator] = useState(presetOperator || "");
  const [amount, setAmount] = useState(presetAmount || "");
  const [error, setError] = useState("");

  const handleRecharge = () => {
    if (mobile.length !== 10) return setError("Mobile number must be 10 digits.");
    if (!operator) return setError("Please select an operator.");
    if (!amount) return setError("Enter a valid recharge amount.");

    setError("");

    const data = {
      mobile,
      operator,
      amount,
      date: new Date().toLocaleString(),
    };

    alert("Recharge Successful!");
    onRecharge(data);
  };

  return (
    <div className="space-y-5">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>}

      <label className="font-bold text-black">Mobile Number</label>
      <input
        type="number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="w-full p-3 border rounded-lg text-black"
      />

      <label className="font-bold text-black">Operator</label>
      <select
        value={operator}
        onChange={(e) => setOperator(e.target.value)}
        className="w-full p-3 border rounded-lg text-black"
      >
        <option value="">Select Operator</option>
        <option value="Airtel">Airtel</option>
        <option value="Jio">Jio</option>
        <option value="Vi">Vodafone Idea</option>
        <option value="BSNL">BSNL</option>
      </select>

      <label className="font-bold text-black">Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 border rounded-lg text-black"
      />

      <button
        onClick={handleRecharge}
        className="w-full bg-[#D4AF37] text-white p-3 rounded-lg hover:bg-black"
      >
        Recharge Now
      </button>
    </div>
  );
}

/* -----------------------------------------------------------
   HISTORY PAGE
----------------------------------------------------------- */
function HistoryPage({ history }) {
  if (history.length === 0)
    return <p className="text-center text-gray-600">No recharge history available.</p>;

  return (
    <div className="space-y-6">
      {history.map((item, index) => (
        <div key={index} className="bg-purple-50 border border-purple-200 p-5 rounded-xl shadow-md">
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-bold text-purple-700">{item.operator} Recharge</p>
              <p><strong>Mobile:</strong> {item.mobile}</p>
              <p><strong>Amount:</strong> ₹{item.amount}</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">{item.date}</p>
              <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                Success
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
