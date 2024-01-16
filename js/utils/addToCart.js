import { updateQuantityCartHeader } from "./updateHeader.js";

export function addToCart(clickItem = '.list_prod') {
    document.querySelector(clickItem).addEventListener('click', function (e) {
        const addCartBtn = e.target;

        if (!addCartBtn.hasAttribute('data-id')) return;

        e.preventDefault();

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

        localStorage.setItem('cart', JSON.stringify(cart));

        updateQuantityCartHeader();
    });
}