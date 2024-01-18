import { getProducts } from "../api/getProducts.js";
import { updateHeader } from "./updateHeader.js";

export function addToCart(clickItem = '.list_prod', quantity = 1) {
    document.querySelector(clickItem).addEventListener('click', async function (e) {
        const addCartBtn = e.target;

        if (!addCartBtn.hasAttribute('data-id')) return;

        e.preventDefault();

        const curId = +addCartBtn.dataset.id;

        const { price } = await getProducts(curId);

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let itemExists = false;

        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];

            if (item.id === curId) {
                item.quantity += quantity;
                itemExists = true;
                break;
            }
        }

        if (!itemExists) {
            const newItem = {
                id: curId,
                quantity: quantity,
                price
            };
            cart.push(newItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        updateHeader();
    });
}