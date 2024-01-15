import { getData } from "./api/getData.js";
import { formatPrice } from "./utils/formatPrice.js";
import { updateQuantityCartHeader } from "./utils/updateHeader.js";

const cartContainer = document.querySelector('table tbody');

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

async function generateCart() {
    const cartData = getCart();

    const promises = cartData.map(async item => {
        const dataItem = await getData(`products/${item.id}`);

        return `<tr>
                <td class="cart_item">
                    <img src="./images/products/${dataItem.images[0]}" alt="">
                    <h5>${dataItem.name}</h5>
                </td>
                <td class="cart_price" data-price="${dataItem.price}">
                    ${formatPrice(dataItem.price)}
                </td>
                <td class="cart_quantity">
                    <div class="quantity">
                        <div class="pro-qty">
                            <span data-dec=${item.id} class="dec qtybtn">-</span>
                            <input type="number" value="${item.quantity}" data-ip=${item.id}>
                            <span class="inc qtybtn" data-inc=${item.id}>+</span>
                        </div>
                    </div>
                </td>
                <td class="cart_total">
                    ${formatPrice(dataItem.price * item.quantity)}
                </td>
                <td class="cart_item_close">
                    <span class="icon_close"><i data-id=${item.id} class="fa fa-times" aria-hidden="true"></i></span>
                </td>
            </tr>`;
    });

    const markup = await Promise.all(promises);

    cartContainer.innerHTML = '';
    cartContainer.insertAdjacentHTML('beforeend', markup);
}

generateCart();

function removeItemCart() {
    document.querySelector('table tbody').addEventListener('click', function (e) {
        const deleteBtn = e.target;

        if (!deleteBtn.hasAttribute('data-id')) return;

        const deleteId = +deleteBtn.dataset.id;

        const cartData = getCart();

        const newCart = cartData.filter(item => item.id !== deleteId);

        setCart(newCart);

        document.querySelector(`tbody tr:is(:has(.fa-times[data-id="${deleteId}"]))`).remove();

        updateQuantityCartHeader();
    });
}

removeItemCart();

function adjustQuantityItem(btn, isInc) {
    const itemId = +btn.dataset[isInc ? 'inc' : 'dec'];
    const inputElement = btn.parentNode.querySelector('input');
    const currentQuantity = +inputElement.value;

    if (!isInc && inputElement.value < 2) return;

    const cartData = getCart();
    const newCart = cartData.map(item =>
        item.id === itemId ? { ...item, quantity: isInc ? item.quantity + 1 : item.quantity - 1 } : item
    );

    console.log(newCart);

    const trElement = btn.closest('tr');
    const price = +trElement.querySelector('.cart_price').dataset.price;
    const totalLabel = trElement.querySelector('.cart_total');

    totalLabel.innerText = formatPrice(price * (isInc ? currentQuantity + 1 : currentQuantity - 1));
    setCart(newCart);
    inputElement.value = isInc ? currentQuantity + 1 : currentQuantity - 1;

    updateQuantityCartHeader();
}

document.querySelector('table tbody').addEventListener('click', function (e) {
    const btn = e.target;

    if (btn.hasAttribute('data-inc')) {
        adjustQuantityItem(btn, true);
    } else if (btn.hasAttribute('data-dec')) {
        adjustQuantityItem(btn, false);
    }
});

document.querySelector('table tbody').addEventListener('change', function (e) {
    const inputElement = e.target;

    if (inputElement.tagName === 'INPUT') {
        const trElement = inputElement.closest('tr');
        const price = +trElement.querySelector('.cart_price').dataset.price;
        const totalLabel = trElement.querySelector('.cart_total');
        const currentQuantity = +inputElement.value;

        const itemId = +inputElement.dataset.ip;
        console.log(itemId);
        const cartData = getCart();
        const newCart = cartData.map(item =>
            item.id === itemId ? { ...item, quantity: currentQuantity } : item
        );

        console.log(currentQuantity);

        totalLabel.innerText = formatPrice(price * currentQuantity);
        setCart(newCart);

        updateQuantityCartHeader();
    }
});