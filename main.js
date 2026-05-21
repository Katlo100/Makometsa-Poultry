/* ============================================================
 ✅ SIMPLE SUCCESS POPUPS
============================================================ */
function submitOrder() {
    window.location.href = "success.html";
}

function submitFeedback() {
    alert("✅ Thank you! Your feedback has been received.");
}

/* ============================================================
 ✅ POPUP PREVIEW ANIMATION (USED ON NAVIGATION)
============================================================ */
function showPagePopup(imageSrc, targetPage) {
    const popup = document.getElementById("pagePopup");
    const popupImg = document.getElementById("popupImage");

    if (!popup || !popupImg) return;

    popupImg.src = imageSrc;
    popup.classList.add("active");

    popupImg.style.opacity = "0";
    setTimeout(() => popupImg.style.opacity = "1", 100);

    setTimeout(() => {
        window.location.href = targetPage;
    }, 1400);
}

document.querySelectorAll("[data-popup]").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const img = link.getAttribute("data-popup");
        const href = link.getAttribute("href");

        if (!img || !href) return;

        showPagePopup(img, href);
    });
});

/* ============================================================
 ✅ PRODUCT DATA (Editable Anytime)
============================================================ */
const productData = {
    broilers: { price: 45, img: "images/broilers.jpg", name: "Broiler Chicken" },
    eggs: { price: 20, img: "images/eggs.jpg", name: "Egg Tray" },
    feed: { price: 180, img: "images/feed.jpg", name: "Chicken Feed 50kg" }
};

/* ============================================================
 ✅ DELIVERY FEES
============================================================ */
const deliveryFees = {
    gabane: 10,
    mogoditshane: 18,
    gaborone: 20,
    tharollo: 12,
    others: 30
};

/* ============================================================
 ✅ DYNAMIC ORDER FORM BUILDER
============================================================ */
let productIndex = 0;

function addProductRow() {
    productIndex++;
    const container = document.getElementById("productList");

    if (!container) return;

    const row = document.createElement("div");
    row.classList.add("product-row", "row", "align-items-center", "mb-3");
    row.setAttribute("data-id", productIndex);

    row.innerHTML = `
        <div class="col-md-3 text-center">
            <img src="${productData.broilers.img}" class="product-img-${productIndex}" style="max-width:110px; margin: 0 auto;">
        </div>

        <div class="col-md-3">
            <label>Product</label>
            <select class="form-control productSelect"
                onchange="updateProductImage(${productIndex}); updateRowTotal(${productIndex});">
                <option value="broilers">Broilers</option>
                <option value="eggs">Eggs</option>
                <option value="feed">Feed</option>
            </select>
        </div>

        <div class="col-md-2">
            <label>Quantity</label>
            <input type="number" class="form-control quantityInput" min="1" value="1"
                   oninput="updateRowTotal(${productIndex})">
        </div>

        <div class="col-md-3">
            <label>Total</label>
            <input type="text" class="form-control rowTotal" readonly>
        </div>

        <div class="col-md-1">
            <button class="btn btn-danger mt-4" onclick="removeProductRow(${productIndex})">✖</button>
        </div>
    `;

    container.appendChild(row);
    updateRowTotal(productIndex);
}

/* ✅ Update product image */
function updateProductImage(id) {
    const row = document.querySelector(`[data-id="${id}"]`);
    if (!row) return;
    
    const product = row.querySelector(".productSelect").value;
    const imgElem = row.querySelector(`.product-img-${id}`);
    if (imgElem) imgElem.src = productData[product].img;
}

/* ✅ Update row total */
function updateRowTotal(id) {
    const row = document.querySelector(`[data-id="${id}"]`);
    if (!row) return;

    const product = row.querySelector(".productSelect").value;
    const qty = parseInt(row.querySelector(".quantityInput").value) || 0;

    const price = productData[product].price;
    const total = price * qty;

    row.querySelector(".rowTotal").value = "P " + total.toFixed(2);

    calculateGrandTotal();
}

/* ✅ Remove row */
function removeProductRow(id) {
    const row = document.querySelector(`[data-id="${id}"]`);
    if (row) {
        row.remove();
        calculateGrandTotal();
    }
}

/* ✅ Calculate final total including delivery */
function calculateGrandTotal() {
    let sum = 0;

    document.querySelectorAll(".rowTotal").forEach(input => {
        sum += parseFloat(input.value.replace("P ", "")) || 0;
    });

    const deliveryLocationEl = document.getElementById("deliveryLocation");
    const deliveryFeeEl = document.getElementById("deliveryFee");
    const grandTotalEl = document.getElementById("grandTotal");

    if (deliveryLocationEl && deliveryFeeEl && grandTotalEl) {
        const location = deliveryLocationEl.value;
        const delivery = deliveryFees[location] || 0;

        deliveryFeeEl.value = "P " + delivery.toFixed(2);
        grandTotalEl.value = "P " + (sum + delivery).toFixed(2);
    }
}

/* ============================================================
 ✅ MOBILE NAV MENU
============================================================ */
function toggleMobileMenu() {
    const navLinks = document.getElementById("navLinks");
    const hamburger = document.getElementById("hamburger");
    
    if (navLinks) navLinks.classList.toggle("mobile-active");
    if (hamburger) hamburger.classList.toggle("active");
}

/* ✅ Auto-close mobile menu when link is clicked */
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        const navLinks = document.getElementById("navLinks");
        const hamburger = document.getElementById("hamburger");
        
        if (navLinks) navLinks.classList.remove("mobile-active");
        if (hamburger) hamburger.classList.remove("active");
    });
});
