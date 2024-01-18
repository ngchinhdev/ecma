import { getProducts } from "./api/getProducts.js";
import { generateProducts, noResult } from "./markups/productsMarkup.js";
import { addToCart } from "./utils/addToCart.js";
import { filterByPrice, filterIncDec, handlePagination, updateTotalResults } from "./utils/filterProducts.js";

const productContainer = document.querySelector('.list_prod');
const paginationContainer = document.querySelector('.product_pagination');

const params = new URLSearchParams(window.location.search);
const queryValue = params.get('query');
const cateValue = params.get('cate');

let filteredProductsFinal = [];

function removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

async function init() {
    const navigationBar = document.querySelector('.navigation_bar ul');
    navigationBar.insertAdjacentHTML('beforeend', `<li>
                                        <span> <i class="fa fa-angle-right"></i> </span>
                                        <a href="product.html?cate=${cateValue}">${cateValue}</a>
                                    </li>`);

    if (queryValue) {
        const orgProducts = await getProducts();

        const filteredProducts = orgProducts.filter(product => removeDiacritics(product.name).toLowerCase().includes(removeDiacritics(queryValue.toLowerCase())));

        if (!filteredProducts.length) {
            noResult(container, "Không tìm thấy sản phẩm tương ứng.");
            return;
        }

        const totalResults = await generateProducts(productContainer, filteredProducts);
        updateTotalResults(totalResults);
        handlePagination(paginationContainer, filteredProducts);
        filterIncDec(filteredProducts, filteredProductsFinal);
        filterByPrice(filteredProducts, filteredProductsFinal);
    }

    if (cateValue) {
        const orgProducts = await getProducts();

        const filteredProducts = orgProducts.filter(product => product.category === cateValue);

        const totalResults = await generateProducts(productContainer, filteredProducts);
        updateTotalResults(totalResults);
        handlePagination(paginationContainer, filteredProducts);
        filterIncDec(filteredProducts, filteredProductsFinal);
        filterByPrice(filteredProducts, filteredProductsFinal);
    }

    addToCart();

}

init();

