
document.addEventListener("DOMContentLoaded", () => {
  const balanceElement = document.getElementById("balance");
  const accountTypeElement = document.getElementById("account-type");
  const premiumBadgeElement = document.getElementById("premium-badge");
  const couponInputElement = document.getElementById("coupon-input");
  const applyCouponBtnElement = document.getElementById("apply-coupon-btn");
  const notificationElement = document.getElementById("notification");

  const COUPON_CODES = {
    "BIT50": { type: "balance", value: 50 },
    "BONUS100": { type: "balance", value: 100 },
    "PREMIUM": { type: "premium", value: null },
  };

  let balance = 0;
  let accountType = "Normal";
  let usedCoupons = [];

  const loadUserData = () => {
    const storedBalance = localStorage.getItem("bitfonix_balance");
    const storedAccountType = localStorage.getItem("bitfonix_accountType");
    const storedUsedCoupons = localStorage.getItem("bitfonix_usedCoupons");

    balance = storedBalance ? parseFloat(storedBalance) : 0;
    accountType = storedAccountType ? storedAccountType : "Normal";
    usedCoupons = storedUsedCoupons ? JSON.parse(storedUsedCoupons) : [];

    updateUI();
  };

  const updateUI = () => {
    balanceElement.textContent = `$${balance.toFixed(2)}`;
    accountTypeElement.textContent = accountType;

    if (accountType === "Premium") {
      premiumBadgeElement.textContent = "👑";
      premiumBadgeElement.style.color = "gold";
    } else {
      premiumBadgeElement.textContent = "";
    }
  };

  const showNotification = (message, isError = false) => {
    notificationElement.textContent = message;
    notificationElement.style.color = isError ? "red" : "green";
    notificationElement.style.display = "block";

    setTimeout(() => {
      notificationElement.style.display = "none";
    }, 3000);
  };

  const applyCoupon = () => {
    const couponCode = couponInputElement.value.trim().toUpperCase();

    if (!couponCode) {
      return;
    }

    if (usedCoupons.includes(couponCode)) {
      showNotification("This coupon has already been used.", true);
      return;
    }

    const coupon = COUPON_CODES[couponCode];

    if (coupon) {
      if (coupon.type === "balance") {
        balance += coupon.value;
        showNotification(`+$${coupon.value} has been added to your balance.`);
      } else if (coupon.type === "premium") {
        accountType = "Premium";
        showNotification("Your account has been upgraded to Premium!");
      }

      usedCoupons.push(couponCode);
      saveUserData();
      updateUI();
    } else {
      showNotification("Invalid coupon code.", true);
    }

    couponInputElement.value = "";
  };

  const saveUserData = () => {
    localStorage.setItem("bitfonix_balance", balance.toString());
    localStorage.setItem("bitfonix_accountType", accountType);
    localStorage.setItem("bitfonix_usedCoupons", JSON.stringify(usedCoupons));
  };

  applyCouponBtnElement.addEventListener("click", applyCoupon);

  loadUserData();
});
