export function updateQuantityCartHeader() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const quantityCartHeader = document.querySelector('.cart_site li:nth-child(2) span');
    quantityCartHeader.innerText = cartData.reduce((acc, cur) => acc += cur.quantity, 0) || 0;

    return cartData;
}