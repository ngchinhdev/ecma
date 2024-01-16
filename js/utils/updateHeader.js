export function updateQuantityCartHeader() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const quantityCartHeader = document.querySelector('.cart_site li:nth-child(2) span');

    const totalQuantities = cartData.reduce((acc, cur) => acc += cur.quantity, 0);
    quantityCartHeader.innerText = (totalQuantities > 99 ? '99+' : totalQuantities) || 0;

    return cartData;
}