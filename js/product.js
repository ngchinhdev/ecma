import { getProducts } from "./api/getProducts.js";
import { generateProducts } from "./markups/productsMarkup.js";
import { addToCart } from "./utils/addToCart.js";

const productContainer = document.querySelector('.list_prod');
const totalResultLabel = document.querySelector('.total_results');

const params = new URLSearchParams(window.location.search);
const queryValue = params.get('query');
const cateValue = params.get('cate');

async function init() {
    if (queryValue) {
        const totalResults = await generateProducts(productContainer, queryValue, true);
        totalResultLabel.innerText = `${totalResults} Kết quả`;
    }

    if (cateValue) {
        const totalResults = await generateProducts(productContainer, cateValue);
        totalResultLabel.innerText = `${totalResults} Kết quả`;

    }
}

init();

addToCart();
