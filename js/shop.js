import { getProducts } from "./api/getProducts.js";
import { generateProducts } from "./markups/productsMarkup.js";
import { addToCart } from "./utils/addToCart.js";
import { filterByPrice, filterIncDec, handlePagination, updateTotalResults } from "./utils/filterProducts.js";

const shopProductContainer = document.querySelector('.list_prod');
const paginationContainer = document.querySelector('.product_pagination');

let filteredProducts = [];

async function init() {
    const orgProducts = await getProducts();

    await generateProducts(shopProductContainer, orgProducts.slice(0, 6));
    updateTotalResults(orgProducts.length);
    handlePagination(paginationContainer, orgProducts);

    addToCart();

    filterIncDec(orgProducts, filteredProducts);
    filterByPrice(orgProducts, filteredProducts);
}

init();
