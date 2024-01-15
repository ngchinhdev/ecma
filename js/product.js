import { generateProducts } from "./markups/productsMarkup.js";

const productContainer = document.querySelector('.list_prod');

const params = new URLSearchParams(window.location.search);
const queryValue = params.get('query');

generateProducts(productContainer, queryValue);