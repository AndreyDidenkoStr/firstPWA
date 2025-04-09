// Данные товаров
const products = [
    { id: 1, name: "Телефон", price: 30000, image: "phone.jpg" },
    { id: 2, name: "Ноутбук", price: 50000, image: "laptop.jpg" },
    { id: 3, name: "Наушники", price: 5000, image: "headphones.jpg" }
];

// Корзина (загружаем из localStorage)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Отображаем товары
function renderProducts() {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = products.map(product => `
        <div class="product">
            <h3>${product.name}</h3>
            <p>${product.price} руб.</p>
            <button onclick="addToCart(${product.id})">В корзину</button>
        </div>
    `).join("");
}

// Добавляем товар в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

// Обновляем корзину
function updateCart() {
    // Сохраняем в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Обновляем счетчик
    document.getElementById("cart-count").textContent = cart.length;

    // Показываем товары в корзине
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = cart.map(item => `
        <div>
            ${item.name} - ${item.price} руб.
        </div>
    `).join("");

    // Считаем сумму
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("cart-total").textContent = total;
}

// Открываем/закрываем корзину
document.getElementById("cart-btn").addEventListener("click", () => {
    document.getElementById("modal").style.display = "block";
});

document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});

// Запускаем приложение
renderProducts();
updateCart();

document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
        } else {
            cart.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-item');
                itemDiv.textContent = `${item.name} — ${item.price} руб.`;
                cartItemsContainer.appendChild(itemDiv);
                total += item.price;
            });
        }

        cartCount.textContent = cart.length;
        cartTotal.textContent = total;
    }

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.dataset.name;
            const price = parseInt(btn.dataset.price);
            cart.push({ name, price });
            updateCartUI();
        });
    });

    document.getElementById('cart-btn').addEventListener('click', () => {
        document.getElementById('modal').style.display = 'block';
    });

    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('modal').style.display = 'none';
    });
});