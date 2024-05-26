document.addEventListener('DOMContentLoaded', function() {
    const couponList = document.getElementById('coupon-list');
    const couponStatus = document.getElementById('coupon-status');
  
    const coupons = [
      { id: '01', used: false },
      { id: '02', used: false },
      { id: '03', used: false }
    ];
  
    function saveCoupons() {
      localStorage.setItem('coupons', JSON.stringify(coupons));
    }
  
    function loadCoupons() {
      const savedCoupons = localStorage.getItem('coupons');
      if (savedCoupons) {
        return JSON.parse(savedCoupons);
      } else {
        saveCoupons();
        return coupons;
      }
    }
  
    function updateCouponStatus(id) {
      const coupon = coupons.find(c => c.id === id);
      if (coupon) {
        if (!coupon.used) {
          coupon.used = true;
          saveCoupons();
          return `Coupon ${id} has been used.`;
        } else {
          return `Coupon ${id} has already been used.`;
        }
      } else {
        return `Invalid coupon.`;
      }
    }
  
    function displayCoupons() {
  const coupons = loadCoupons();
  const couponList = document.getElementById('coupon-list');
  
  coupons.forEach(coupon => {
    const li = document.createElement('li');
    li.textContent = `Coupon ID: ${coupon.id} - Used: ${coupon.used ? 'Yes' : 'No'}`;
    
    // Memeriksa status kupon dan menambahkan kelas yang sesuai
    if (coupon.used) {
      li.classList.add('used');
    } else {
      li.classList.add('unused');
    }

    couponList.appendChild(li);
  });
}
  
    function checkCoupon() {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      if (id) {
        couponStatus.textContent = updateCouponStatus(id);
      }
    }
  
    if (couponList) {
      displayCoupons();
    }
  
    if (couponStatus) {
      checkCoupon();
    }

});

document.addEventListener('DOMContentLoaded', function() {
    const resetButton = document.getElementById('reset-button');

    if (resetButton) {
        resetButton.addEventListener('click', function() {
          localStorage.removeItem('coupons');
          location.reload(); // Refresh the page to see the reset coupons
        });
      }

  });

document.addEventListener('DOMContentLoaded', function() {
    const returnButton = document.getElementById('return-button');

    function redirectToIndex() {
        window.location.href = 'index.html'; // Redirect to index.html without resetting coupons
    }

    if (returnButton) {
        returnButton.addEventListener('click', redirectToIndex);
    }
});
