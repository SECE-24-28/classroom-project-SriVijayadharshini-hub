const planSelect = document.getElementById("plan");
const amountInput = document.getElementById("amount");
const rechargeForm = document.getElementById("rechargeForm");


planSelect.addEventListener("change", () => {
    amountInput.value = planSelect.value ? "₹" + planSelect.value : "";
});


rechargeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const mobile = document.getElementById("mobile").value.trim();

    if (mobile.length !== 10) {
        alert("Please enter a valid 10-digit mobile number!");
        return;
    }

    alert("Recharge Successful! Redirecting to payment...");
    window.location.href = "payment.html"; 
});
