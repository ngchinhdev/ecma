import { getProducts } from "./api/getProducts.js";
import { generateProducts } from "./markups/productsMarkup.js";
import { addToCart } from "./utils/addToCart.js";

const shopProductContainer = document.querySelector('.list_prod');
const totalResultLabel = document.querySelector('.total_results');

async function init() {
    const totalResults = await getProducts();

    totalResultLabel.innerText = `${totalResults.length} Kết quả`;
}

await generateProducts(shopProductContainer);

init();
addToCart();
