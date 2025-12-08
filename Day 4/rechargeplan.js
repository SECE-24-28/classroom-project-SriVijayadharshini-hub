const plan = [
    {
        "Name": "Jio",
        "Planprice": 39,
        "Data": "3GB/day",
        "Validity": "3 days",
        "Calls": "NA",
        "SMS": "NA",
        "ExtraBenefits": "NA",
        "id": "1"
    },
    {
        "Name": "Jio",
        "Planprice": 349,
        "Data": "Unlimited 5G+2GB/day",
        "Validity": "28 days",
        "Calls": "Unlimited calls",
        "SMS": "100 SMS/day",
        "ExtraBenefits": "Unlimited true 5G data, Jio Hotstar, Jio TV",
        "id": "2"
    },
    {
        "Name": "Jio",
        "Planprice": 899,
        "Data": "Unlimited 5G+2GB/day",
        "Validity": "90 days",
        "Calls": "Unlimited Calls",
        "SMS": "100 SMS/day",
        "ExtraBenefits": "Unlimited true 5G data, Jio Hotstar, Jio TV",
        "id": "3"
    },
    {
        "Name": "Jio",
        "Planprice": 3599,
        "Data": "Unlimited 5G+2.5GB/day",
        "Validity": "365 days",
        "Calls": "Unlimited Calls",
        "SMS": "100 SMS/day",
        "ExtraBenefits": "Unlimited true 5G data, Jio Hotstar, Jio TV",
        "id": "4"
    },
    {
        "Name": "Jio",
        "Planprice": 11,
        "Data": "Unlimited",
        "Validity": "1 hour",
        "Calls": "NA",
        "SMS": "NA",
        "ExtraBenefits": "NA",
        "id": "5"
    },

    {
        "Name": "Airtel",
        "Planprice": 33,
        "Data": "2GB",
        "Validity": "1 day",
        "Calls": "NA",
        "SMS": "NA",
        "ExtraBenefits": "NA",
        "id": "6"
    },
    {
        "Name": "Airtel",
        "Planprice": 279,
        "Data": "1GB",
        "Validity": "1 month",
        "Calls": "Unlimited",
        "SMS": "Unlimited",
        "ExtraBenefits": "Jio Hotstar, Zee5 Premium, Netflix basic",
        "id": "7"
    },
    {
        "Name": "Airtel",
        "Planprice": 349,
        "Data": "Unlimited 5G+2GB/day",
        "Validity": "28 days",
        "Calls": "Unlimited",
        "SMS": "Unlimited",
        "ExtraBenefits": "Unlimited 5G, Apple Music",
        "id": "8"
    },
    {
        "Name": "Airtel",
        "Planprice": 859,
        "Data": "Unlimited 5G+2GB/day",
        "Validity": "84 days",
        "Calls": "Unlimited",
        "SMS": "100/day",
        "ExtraBenefits": "Unlimited 5G, Apple Music",
        "id": "9"
    },

    
    {
        "Name": "BSNL",
        "Planprice": 147,
        "Data": "Unlimited",
        "Validity": "25 days",
        "Calls": "Unlimited",
        "SMS": "Unlimited",
        "ExtraBenefits": "N/A",
        "id": "11"
    },
    {
        "Name": "BSNL",
        "Planprice": 16,
        "Data": "Unlimited",
        "Validity": "1 day",
        "Calls": "Unlimited",
        "SMS": "Unlimited",
        "ExtraBenefits": "N/A",
        "id": "12"
    },
    {
        "Name": "BSNL",
        "Planprice": 198,
        "Data": "Unlimited",
        "Validity": "30 days",
        "Calls": "Unlimited",
        "SMS": "Unlimited",
        "ExtraBenefits": "N/A",
        "id": "13"
    }
];

function isNA(value){
    if(!value) return true;
    const v = value.toLowerCase().trim();
    return v==="na" || v=="n/a" ||v==="";
}

function displayVal(label, value) {
    return isNA(value) ? "" : `<p><b>${label}:</b> ${value}</p>`;
}


function getCategory(p) {
    const calls = p.Calls.toLowerCase();
    const data = p.Data.toLowerCase();
    const sms = p.SMS.toLowerCase();
    const extra = p.ExtraBenefits.toLowerCase();

    
    if (!isNA(extra)) return "extra";
    if (data.includes("gb") || data.includes("data")) return "data";
    if (calls.includes("unlimited")) return "unlimited";
    if (!isNA(sms)) return "sms";

    return "";
}



const planList = document.getElementById("plan-list");
const operatorSelect = document.getElementById("operator");
const tabs = document.querySelectorAll(".tab");

function loadPlans(selectedCategory = "", selectedOperator = "") {
    planList.innerHTML = "";

    let filtered = plan;

    if (selectedOperator !== "") {
        filtered = filtered.filter(p => p.Name === selectedOperator);
    }

    if (selectedCategory !== "") {
        filtered = filtered.filter(p => getCategory(p) === selectedCategory);
    }

    if (filtered.length === 0) {
        planList.innerHTML = "<p>No plans available.</p>";
        return;
    }

    filtered.forEach(p => {
        const card = `
            <div class="plan-card">
                <div class="plan-left">
                    <h2>₹${p.Planprice}</h2>
                    ${displayVal("Calls", p.Calls)}
                    ${displayVal("Data", p.Data)}
                    ${displayVal("SMS", p.SMS)}
                    ${displayVal("Extra", p.ExtraBenefits)}
                </div>
                <div class="plan-right">
                    <h3>${p.Validity}</h3>
                    <p>Validity</p>
                </div>
            </div>
        `;
        planList.innerHTML += card;
    });
}



operatorSelect.addEventListener("change", () => {
    loadPlans("", operatorSelect.value);
});

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const category = tab.dataset.tab;
        loadPlans(category, operatorSelect.value);
    });
});



loadPlans();