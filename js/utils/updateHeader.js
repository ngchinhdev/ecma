import { formatPrice } from "./formatPrice.js";

function updateQuantityCartHeader() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const quantityCartHeader = document.querySelector('.cart_site li:nth-child(2) span');

    const totalQuantities = cartData.reduce((acc, cur) => acc += cur.quantity, 0);
    quantityCartHeader.innerText = (totalQuantities > 99 ? '99+' : totalQuantities) || 0;

    return cartData;
}

function updateTotalPriceCartHeader() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const priceCartHeader = document.querySelector('.cart_site li:nth-child(3) b');

    const totalPrice = cartData.reduce((acc, cur) => acc += +cur.price * cur.quantity, 0);
    priceCartHeader.innerText = formatPrice(totalPrice) || formatPrice(0);

    return cartData;
}

export function updateHeader() {
    updateQuantityCartHeader();
    updateTotalPriceCartHeader();
}