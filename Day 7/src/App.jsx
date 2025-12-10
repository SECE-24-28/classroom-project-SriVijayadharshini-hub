import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import background from '/src/assets/background.avif'; // replace with your image path

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${background.avif})` }}
    >
      <Navbar />

      <div className="flex">

        <Sidebar className="bg-gray-200 min-h-screen" />

        {/* MAIN CONTENT */}
        <div className="flex-1 p-10 space-y-10">

          {/* Welcome */}
          <div className="text-center text-gray-900">
            <h1 className="text-4xl font-bold">Welcome to Mobile Recharge App</h1>
            <p className="mt-3 text-lg">
              Select recharge options from the sidebar or choose your operator below.
            </p>
          </div>

          {/* Operator Selection Grid */}
          <div className="bg-purple/80 backdrop-blur-md rounded-xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">
              Select Your Operator
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              {/* Airtel */}
              <div
                onClick={() => window.location.href = "/recharge"}
                className="flex flex-col items-center justify-center bg-red-500 text-white rounded-xl p-6 cursor-pointer hover:scale-105 transition transform shadow-lg"
              >
                <span className="text-5xl">🟥</span>
                <p className="mt-3 text-lg font-semibold">Airtel</p>
              </div>

              {/* Jio */}
              <div
                onClick={() => window.location.href = "/recharge"}
                className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-xl p-6 cursor-pointer hover:scale-105 transition transform shadow-lg"
              >
                <span className="text-5xl">🔵</span>
                <p className="mt-3 text-lg font-semibold">Jio</p>
              </div>

              {/* Vodafone Idea */}
              <div
                onClick={() => window.location.href = "/recharge"}
                className="flex flex-col items-center justify-center bg-purple-600 text-white rounded-xl p-6 cursor-pointer hover:scale-105 transition transform shadow-lg"
              >
                <span className="text-5xl">🟣</span>
                <p className="mt-3 text-lg font-semibold">Vi</p>
              </div>

              {/* BSNL */}
              <div
                onClick={() => window.location.href = "/recharge"}
                className="flex flex-col items-center justify-center bg-blue-400 text-white rounded-xl p-6 cursor-pointer hover:scale-105 transition transform shadow-lg"
              >
                <span className="text-5xl">🟦</span>
                <p className="mt-3 text-lg font-semibold">BSNL</p>
              </div>

            </div>
          </div>

          {/* About Card */}
          <div className="bg-white shadow-xl p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-3 text-purple-700">About Our Recharge Service</h2>
            <p className="text-gray-700 leading-relaxed">
              Our mobile recharge platform provides fast and secure recharge services
              for all major telecom operators. You can instantly top-up your prepaid mobile,
              browse plans, and enjoy exclusive offers.
            </p>
          </div>

          {/* Popular Plans */}
          <div className="bg-white shadow-xl p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-3 text-purple-700">Popular Recharge Plans</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>₹199 – 1.5GB/day + Unlimited Calls (28 days)</li>
              <li>₹399 – 2GB/day + Unlimited Calls (56 days)</li>
              <li>₹599 – 3GB/day + 100 SMS/day (84 days)</li>
              <li>₹99 – Talktime + Local/National SMS</li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white shadow-xl p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-3 text-purple-700">Why Choose Us?</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Safe & Secure Payments</li>
              <li>Instant Recharge Confirmation</li>
              <li>Best Deals & Cashback Offers</li>
              <li>24/7 Customer Support</li>
            </ul>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
