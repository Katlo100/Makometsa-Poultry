const productData = {
    broilers: { price: 45, img: "images/broilers.jpg", name: "Broiler Chicken" },
    eggs: { price: 20, img: "images/eggs.jpg", name: "Egg Tray" },
    feed: { price: 180, img: "images/feed.jpg", name: "Chicken Feed 50kg" }
};

const deliveryFees = {
    gabane: 10,
    mogoditshane: 18,
    gaborone: 20,
    tharollo: 12,
    others: 30
};

function submitOrder() {
    window.location.href = "success.html";
}

function submitFeedback() {
    alert("✅ Thank you! Your feedback has been received.");
}

function showPagePopup(imageSrc, targetPage) {
    const popup = document.getElementById("pagePopup");
    const popupImg = document.getElementById("popupImage");

    if (!popup || !popupImg) return;

    popupImg.src = imageSrc;
    popup.classList.add("active");

    setTimeout(() => {
        window.location.href = targetPage;
    }, 1200);
}

document.querySelectorAll("[data-popup]").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        showPagePopup(link.dataset.popup, link.href);
    });
});

let productIndex = 0;

function addProductRow() {
    const container = document.getElementById("productList");
    if (!container) return;

    productIndex++;

    const row = document.createElement("div");
    row.className = "product-row row";
    row.dataset.id = productIndex;

    row.innerHTML = `
        <div class="col-3 text-center">
            <img src="${productData.broilers.img}" class="product-img">
        </div>

        <div class="col-3">
            <select class="form-control productSelect">
                ${Object.keys(productData).map(p =>
                    `<option value="${p}">${productData[p].name}</option>`
                ).join("")}
            </select>
        </div>

        <div class="col-2">
            <input type="number" class="form-control quantityInput" min="1" value="1">
        </div>

        <div class="col-3">
            <input type="text" class="form-control rowTotal" readonly>
        </div>

        <div class="col-1">
            <button class="btn btn-danger removeBtn">✖</button>
        </div>
    `;

    container.appendChild(row);

    const select = row.querySelector(".productSelect");
    const qty = row.querySelector(".quantityInput");
    const removeBtn = row.querySelector(".removeBtn");

    select.addEventListener("change", () => updateRow(row));
    qty.addEventListener("input", () => updateRow(row));
    removeBtn.addEventListener("click", () => {
        row.remove();
        calculateTotal();
    });

    updateRow(row);
}

function updateRow(row) {
    const product = row.querySelector(".productSelect").value;
    const qty = parseInt(row.querySelector(".quantityInput").value) || 0;

    const data = productData[product];

   
    row.querySelector(".product-img").src = data.img;

  
    const total = data.price * qty;
    row.querySelector(".rowTotal").value = `P ${total.toFixed(2)}`;

    calculateTotal();
}

function calculateTotal() {
    let sum = 0;

    document.querySelectorAll(".rowTotal").forEach(el => {
        sum += parseFloat(el.value.replace("P ", "")) || 0;
    });

    const location = document.getElementById("deliveryLocation");
    const deliveryFeeEl = document.getElementById("deliveryFee");
    const grandTotalEl = document.getElementById("grandTotal");

    if (!location || !deliveryFeeEl || !grandTotalEl) return;

    const delivery = deliveryFees[location.value] || 0;

    deliveryFeeEl.value = `P ${delivery.toFixed(2)}`;
    grandTotalEl.value = `P ${(sum + delivery).toFixed(2)}`;
}

document.getElementById("deliveryLocation")?.addEventListener("change", calculateTotal);

function toggleMobileMenu() {
    document.getElementById("navLinks")?.classList.toggle("active");
    document.getElementById("hamburger")?.classList.toggle("active");
}

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navLinks")?.classList.remove("active");
        document.getElementById("hamburger")?.classList.remove("active");
    });
});

let cart = [];

const cartIcon = document.getElementById("cartIcon");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");

cartIcon.onclick = () => cartSidebar.classList.toggle("active");
closeCart.onclick = () => cartSidebar.classList.remove("active");

document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const price = parseFloat(btn.dataset.price);

        const existing = cart.find(item => item.name === name);

        if (existing) existing.qty++;
        else cart.push({ name, price, qty: 1 });

        updateCart();
    });
});

function updateCart() {
    const items = document.getElementById("cartItems");
    const count = document.getElementById("cartCount");
    const totalEl = document.getElementById("cartTotal");

    let total = 0;
    items.innerHTML = "";

    cart.forEach(item => {
        total += item.price * item.qty;

        items.innerHTML += `
          <div class="cart-item">
            ${item.name} x${item.qty} - P${(item.price * item.qty).toFixed(2)}
          </div>
        `;
    });

    count.textContent = cart.reduce((s,i)=>s+i.qty,0);
    totalEl.textContent = total.toFixed(2);
}

document.getElementById("hamburger").onclick = () => {
    document.getElementById("navLinks").classList.toggle("active");
};

document.body.style.overflow = "hidden";

setTimeout(() => {
    document.getElementById("introPopup").style.display = "none";
    document.body.style.overflow = "auto";
}, 2000);
