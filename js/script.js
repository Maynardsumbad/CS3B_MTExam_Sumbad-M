let cart = [];
let totalPrice = 0;

function addToCart(productName, price) {
    let item = cart.find(product => product.name === productName);
    
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(productName) {
    cart = cart.filter(product => product.name !== productName);
    updateCart();
}

function increaseQuantity(productName) {
    let item = cart.find(product => product.name === productName);
    if (item) {
        item.quantity++;
    }
    updateCart();
}

function decreaseQuantity(productName) {
    let item = cart.find(product => product.name === productName);
    if (item && item.quantity > 1) {
        item.quantity--;
    } else {
        removeFromCart(productName);
    }
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart-list");
    let totalElement = document.getElementById("total-price");
    let checkoutBtn = document.getElementById("checkout-btn");

    cartList.innerHTML = "";
    totalPrice = 0;

    cart.forEach(product => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${product.name} - $${product.price} x ${product.quantity} = $${product.price * product.quantity}
            <button class="quantity-btn" onclick="increaseQuantity('${product.name}')">+</button>
            <button class="quantity-btn" onclick="decreaseQuantity('${product.name}')">-</button>
        `;
        cartList.appendChild(li);
        totalPrice += product.price * product.quantity;
    });

    totalElement.innerText = totalPrice;
    checkoutBtn.style.display = cart.length > 0 ? "block" : "none";
}

function goBack() {
    window.location.href = "index.html";
}

function checkout() {
    if (cart.length === 0) return;

    let receiptContent = document.getElementById("receipt-content");
    let receiptModal = document.getElementById("receipt-modal");

    let receiptText = "Receipt:\n";
    cart.forEach(product => {
        receiptText += `${product.name} - $${product.price} x ${product.quantity} = $${product.price * product.quantity}\n`;
    });
    receiptText += `\nTotal: $${totalPrice}`;

    receiptContent.innerText = receiptText;
    receiptModal.style.display = "block";
}

function closeReceipt() {
    document.getElementById("receipt-modal").style.display = "none";
}
