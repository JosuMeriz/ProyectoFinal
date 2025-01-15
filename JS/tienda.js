const products = [
    { id: 1, name: "Gorra A", price: 15.0, image: "./IMAGENES/Gorra1.png" },
    { id: 2, name: "Gorra B", price: 15.0, image: "./IMAGENES/Gorra2.png" },
    { id: 3, name: "Camiseta", price: 9.50, image: "./IMAGENES/Camiseta.png" },
    { id: 4, name: "Hoodie", price: 45.0, image: "./IMAGENES/Hoodie.png" },
];

const cart = [];

// Render products
const productList = document.getElementById("product-list");
products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product";
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
    `;
    productList.appendChild(productCard);
});

// Add to cart
function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    const cartItem = cart.find((item) => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
}

// Render cart
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
        `;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(productId) {
    const cartIndex = cart.findIndex((item) => item.id === productId);

    if (cartIndex > -1) {
        cart[cartIndex].quantity -= 1;

        if (cart[cartIndex].quantity === 0) {
            cart.splice(cartIndex, 1);
        }
    }
    renderCart();
}

// Checkout button
document.getElementById("checkout-btn").addEventListener("click", () => {
    alert("Compra realizada con éxito. ¡Gracias!");
    cart.length = 0; // Vacía el carrito
    renderCart();
});
