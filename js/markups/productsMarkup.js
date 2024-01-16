import { getProducts } from "../api/getProducts.js";
import { formatPrice } from "../utils/formatPrice.js";
import { loader } from "../utils/loader.js";

function noResult(container, message) {
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', `<div class="empty_prods">${message}</div>`);
}

function removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export async function generateProducts(container, query = 'all', isSearch = false) {
    container.innerHTML = '';
    await loader(container, 1000);

    const products = await getProducts();

    if (!products.length) {
        noResult(container, 'Không có sản phẩm nào.');
        return;
    }

    let markup = '';
    let newDataProducts = null;

    if (!isSearch) {
        newDataProducts = products.filter(product => product.category === query);
    }

    if (isSearch) {
        newDataProducts = products.filter(product => removeDiacritics(product.name).toLowerCase().includes(removeDiacritics(query.toLowerCase())));

        if (!newDataProducts.length) {
            noResult(container, "Không tìm thấy sản phẩm tương ứng.");
            return;
        }
    }

    const totalResults = newDataProducts.length === 0 ? products.length : newDataProducts.length;

    (newDataProducts.length === 0 ? products.slice(0, 8) : newDataProducts).map(product => {
        const { id, category, name, price, orgPrice, likes, purchased, mass, images } = product;

        markup += `<div class="item_col">
                    <div class="item">
                        <div class="item_pic">
                            <img src="./images/products/${images[0]}" alt="${name}">
                            <ul class="item_pic_hover">
                                <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                <li><a href="detail.html?cate=${category}&id=${id}"><i class="fa fa-money" aria-hidden="true"></i></a></li>
                                <li><a href="#" data-id=${id}><i class="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div class="item_text">
                            <h6><a href="detail.html?cate=${category}&id=${id}">${name}</a></h6>
                            <div class="under">
                                <h5><del>${formatPrice(orgPrice)}</del><span>${formatPrice(price)}</span><span class="mass">/${mass}</span></h5>
                                <p><span>Lượt mua: ${purchased}</span><span><i class="fa fa-heart"></i> ${likes}</span></p>
                            </div>
                        </div>
                    </div>
                </div>`;
    }).join('');

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);

    return totalResults || 0;
}