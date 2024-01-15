import { updateQuantityCartHeader } from "./updateHeader.js";

export function addToCart() {
    document.querySelector('.list_prod').addEventListener('click', function (e) {
        e.preventDefault();

        const addCartBtn = e.target;

        if (!addCartBtn.hasAttribute('data-id')) return;

        const curId = +addCartBtn.dataset.id;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let itemExists = false;

        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];

            if (item.id === curId) {
                item.quantity++;
                itemExists = true;
                break;
            }
        }

        if (!itemExists) {
            const newItem = {
                id: curId,
                quantity: 1,
            };
            cart.push(newItem);
        }

        updateQuantityCartHeader();

        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(localStorage.getItem('cart') || []);
    });
}