function submitOrder() {
    window.location.href = "success.html";
}

function submitFeedback() {
    alert("✅ Thank you! Your feedback has been received.");
}

document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        const menu = document.querySelector(".navbar-collapse");
        if (menu && menu.classList.contains("show")) {
            menu.classList.remove("show");
        }
    });
});

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

let productIndex = 0;

function addProductRow() {
    productIndex++;
    const container = document.getElementById("productList");

    const row = document.createElement("div");
    row.classList.add("product-row", "row", "align-items-center", "mb-3");
    row.setAttribute("data-id", productIndex);

    row.innerHTML = `
        <div class="col-md-3 text-center">
            <img src="${productData.broilers.img}" class="product-img-${productIndex}" style="max-width:110px;">
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

function updateProductImage(id) {
    const row = document.querySelector(`[data-id="${id}"]`);
    const product = row.querySelector(".productSelect").value;
    const imgElem = row.querySelector(`.product-img-${id}`);
    imgElem.src = productData[product].img;
}

function updateRowTotal(id) {
    const row = document.querySelector(`[data-id="${id}"]`);
    const product = row.querySelector(".productSelect").value;
    const qty = parseInt(row.querySelector(".quantityInput").value) || 0;

    const price = productData[product].price;
    const total = price * qty;

    row.querySelector(".rowTotal").value = "P " + total.toFixed(2);

    calculateGrandTotal();
}

function removeProductRow(id) {
    document.querySelector(`[data-id="${id}"]`).remove();
    calculateGrandTotal();
}

function calculateGrandTotal() {
    let sum = 0;

    document.querySelectorAll(".rowTotal").forEach(input => {
        sum += parseFloat(input.value.replace("P ", "")) || 0;
    });

    const location = document.getElementById("deliveryLocation").value;
    const delivery = deliveryFees[location] || 0;

    document.getElementById("deliveryFee").value = "P " + delivery.toFixed(2);
    document.getElementById("grandTotal").value = "P " + (sum + delivery).toFixed(2);
}

let cart = [];
let cartTotal = 0;

function toggleCart() {
    document.getElementById("cartSidebar").classList.toggle("active");
}

function addToCart(name, price) {
    cart.push({ name, price });
    cartTotal += price;

    updateCartUI();

    document.getElementById("cartIcon").style.transform = "scale(1.2)";
    setTimeout(() => document.getElementById("cartIcon").style.transform = "scale(1)", 200);
}

function updateCartUI() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name} – P${item.price}</span>
                <button class="btn btn-sm btn-danger" onclick="removeCartItem(${index})">x</button>
            </div>
        `;
    });

    document.getElementById("cartTotal").innerText = cartTotal.toFixed(2);
    document.getElementById("cartCount").innerText = cart.length;
}

function removeCartItem(index) {
    cartTotal -= cart[index].price;
    cart.splice(index, 1);

    updateCartUI();
}

function toggleMobileMenu() {
  document.getElementById("navLinks").classList.toggle("mobile-active");
  document.getElementById("hamburger").classList.toggle("active");
}
