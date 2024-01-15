import { getProducts } from "../api/getProducts.js";
import { formatPrice } from "../utils/formatPrice.js";
import { loader } from "../utils/loader.js";

export async function generateProducts(container, type = 'all') {
    container.innerHTML = '';
    await loader(container, 1000);

    const products = await getProducts();

    if (!products.length) {
        container.innerHTML = '';
        container.insertAdjacentHTML('beforeend', `<div class="empty_prods">Không có sản phẩm nào.</div>`);
        return;
    }

    let markup = '';

    const typeProducts = products.filter(product => product.category === type);

    (typeProducts.length === 0 ? products : typeProducts).map(product => {
        const { id, category, name, price, orgPrice, quantity, likes, purchased, images, description } = product;

        markup += `<div class="item_col">
                    <div class="item">
                        <div class="item_pic">
                            <img src="./images/products/${images[0]}" alt="${name}">
                            <ul class="item_pic_hover">
                                <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                <li><a href="#"><i class="fa fa-money" aria-hidden="true"></i></a></li>
                                <li><a href="#"  data-id=${id}><i class="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div class="item_text">
                            <h6><a href="#">${name}</a></h6>
                            <div class="under">
                                <h5><del>${formatPrice(orgPrice)}</del><span>${formatPrice(price)}</span></h5>
                                <p><span>Lượt mua: ${purchased}</span><span><i class="fa fa-heart"></i> ${likes}</span></p>
                            </div>
                        </div>
                    </div>
                </div>`;
    }).join('');

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}