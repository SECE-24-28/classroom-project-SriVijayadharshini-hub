import FeatureRow from "../components/ui/FeatureRow";

export default function PlanPage({ operator, onSelectPlan, isLoggedIn }) {
  const plans = {
    Airtel: [
      {
        price: 199,
        data: "1.5GB/day",
        validity: "28 days",
        calls: "Unlimited",
        sms: "100/day",
        offer: "5% Cashback",
        popular: false,
        highlights: ["Airtel Thanks Benefits", "Free Wynk Music"]
      },
      {
        price: 399,
        data: "2GB/day",
        validity: "56 days",
        calls: "Unlimited",
        sms: "100/day",
        offer: "10% Cashback",
        popular: true,
        highlights: ["Best Seller", "Extra Data Rollover"]
      },
      {
        price: 599,
        data: "3GB/day",
        validity: "84 days",
        calls: "Unlimited",
        sms: "100/day",
        offer: "Best Value",
        popular: true,
        highlights: ["Unlimited 5G Data", "Hotstar Premium"]
      },
      {
        price: 999,
        data: "3GB/day",
        validity: "365 days",
        calls: "Unlimited",
        sms: "100/day",
        offer: "Annual Plan",
        popular: false,
        highlights: ["Year-long Validity", "Priority Support"]
      },
    ],

    Jio: [
      {
        price: 209,
        data: "1.5GB/day",
        validity: "28 days",
        calls: "Unlimited",
        sms: "100/day",
        offer: "Jio App Benefits",
        popular: false,
        highlights: ["JioCinema", "JioCloud"]
      },
      {
        price: 444,
        data: "2GB/day",
        validity: "56 days",
        calls: "Unlimited",
        sms: "100/day",
        offer: "10% Cashback",
        popular: true,
        highlights: ["Free OTT Access", "5G Ready"]
      },
      {
        price: 666,
        data: "1.5GB/day",
        validity: "84 days",
        calls: "Unlimited",
        sms: "100/day",
        offer: "Free OTT Access",
        popular: true,
        highlights: ["Disney+ Hotstar", "JioTV"]
      },
      {
        price: 2999,
        data: "2.5GB/day",
        validity: "365 days",
        calls: "Unlimited",
        sms: "100/day",
        offer: "Annual Super Saver",
        popular: false,
        highlights: ["Maximum Savings", "All OTT Apps"]
      },
    ],

    Vi: [
      {
        price: 199,
        data: "1GB/day",
        validity: "28 days",
        calls: "Unlimited",
        sms: "100/day",
        offer: "Weekend Data Rollover",
        popular: false,
        highlights: ["Vi Movies", "Night Data"]
      },
      {
        price: 479,
        data: "1.5GB/day",
        validity: "56 days",
        calls: "Unlimited",
        sms: "100/day",
        offer: "Binge All Night",
        popular: true,
        highlights: ["Unlimited Night Data", "Vi Music"]
      },
      {
        price: 839,
        data: "2GB/day",
        validity: "84 days",
        calls: "Unlimited",
        sms: "100/day",
        offer: "Extra Data",
        popular: true,
        highlights: ["Premium OTT Pack", "Carry Forward"]
      },
      {
        price: 2899,
        data: "2GB/day",
        validity: "365 days",
        calls: "Unlimited",
        sms: "100/day",
        offer: "Annual Vi Pack",
        popular: false,
        highlights: ["Year-long Service", "VIP Support"]
      },
    ],

    BSNL: [
      {
        price: 147,
        data: "10GB",
        validity: "30 days",
        calls: "Unlimited",
        sms: "100/day",
        offer: "Budget Plan",
        popular: false,
        highlights: ["Nationwide Coverage", "Affordable"]
      },
      {
        price: 247,
        data: "2GB/day",
        validity: "30 days",
        calls: "Unlimited",
        sms: "100/day",
        offer: "Value Pack",
        popular: true,
        highlights: ["High Speed Data", "Free Roaming"]
      },
      {
        price: 397,
        data: "Unlimited Data",
        validity: "60 days",
        calls: "Unlimited",
        sms: "100/day",
        offer: "Best Seller",
        popular: true,
        highlights: ["Unlimited Browsing", "2 Months Validity"]
      },
      {
        price: 1999,
        data: "2GB/day",
        validity: "365 days",
        calls: "Unlimited",
        sms: "100/day",
        offer: "Annual Saver",
        popular: false,
        highlights: ["Annual Plan", "Best Value"]
      },
    ],
  };

  const handleRechargeClick = (plan) => {
    if (!isLoggedIn) {
      alert("Please login first to proceed with recharge.");
      return;
    }
    onSelectPlan({ price: plan.price, operator });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
          {operator} Recharge Plans
        </h1>
        <p className="text-gray-400">Choose the perfect plan for your needs</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {plans[operator].map((p, index) => (
          <div
            key={index}
            className={`bg-gray-800/60 rounded-xl md:rounded-2xl p-5 md:p-6 shadow-lg border ${
              p.popular 
                ? 'border-gray-600 shadow-gray-900/50' 
                : 'border-gray-700'
            } hover:shadow-xl transition-all duration-300`}
          >
            {p.popular && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <span className="bg-gray-700 text-gray-200 text-xs px-3 py-1 rounded-full border border-gray-600">
                  Most Popular
                </span>
              </div>
            )}

            {/* Plan Header */}
            <div className="mb-5 md:mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xl md:text-2xl font-bold text-white">₹{p.price}</span>
                  <span className="text-sm text-gray-500 ml-2">+ taxes</span>
                </div>
                {p.popular && (
                  <span className="bg-gray-700 text-gray-200 text-xs font-semibold px-3 py-1 rounded-full border border-gray-600">
                    RECOMMENDED
                  </span>
                )}
              </div>
              
              <div className="mt-2">
                <p className="text-base md:text-lg font-semibold text-white">{p.data}</p>
                <p className="text-gray-400">Validity: {p.validity}</p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-5 md:mb-6">
              <FeatureRow icon="📞" text={p.calls} />
              <FeatureRow icon="💬" text={p.sms} />
              {p.highlights.map((highlight, idx) => (
                <FeatureRow key={idx} icon="⭐" text={highlight} />
              ))}
            </div>

            {/* Offer */}
            <div className="mb-5 md:mb-6 p-4 bg-gray-900/30 rounded-lg border border-gray-700">
              <p className="font-semibold text-gray-300 flex items-center">
                <span className="mr-2">🎁</span>
                {p.offer}
              </p>
            </div>

            {/* Recharge Button */}
            <button
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                isLoggedIn
                  ? p.popular
                    ? 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white border border-gray-600'
                    : 'bg-gray-900 hover:bg-gray-800 text-white border border-gray-700'
                  : 'bg-gray-800 cursor-not-allowed text-gray-500 border border-gray-700'
              }`}
              disabled={!isLoggedIn}
              onClick={() => handleRechargeClick(p)}
            >
              {isLoggedIn ? 'Recharge Now' : 'Login to Recharge'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}