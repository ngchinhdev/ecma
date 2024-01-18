import { getData } from "../api/getData.js";
import { getCart } from "../cart.js";
import { formatPrice } from "../utils/formatPrice.js";

const cartContainer = document.querySelector('table tbody');
const cartCart = document.querySelector('.cart');
const cartBill = document.querySelector('.discount_bill');

export function emptyCart() {
    cartCart.innerHTML = '';
    cartBill.innerHTML = '';
    cartCart.insertAdjacentHTML('beforeend', `<div class="empty_cart">
                                                <img src="../images/empty-cart.png" />
                                                <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
                                                <a href="shop.html">
                                                    <i class="fa fa-caret-left" aria-hidden="true">
                                                </i>Quay lại mua hàng</a>
                                            </div>`);
}

export async function generateCart() {
    const cartData = getCart();

    if (!cartData.length) {
        emptyCart();
        return false;
    }

    const promises = cartData.map(async item => {
        const dataItem = await getData(`products/${item.id}`);

        return `<tr>
                <td class="cart_item">
                    <img src="./images/products/${dataItem.images[0]}" alt="${dataItem.name}">
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
    cartContainer.insertAdjacentHTML('beforeend', markup.join(''));

    return true;
}