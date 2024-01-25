import { getProducts } from "../api/apiProducts.js";
import { generateImagesProduct, generateInfoProduct } from "./markups/detailsMarkup.js";
import { generateNavigation } from "./markups/navigationMarkup.js";
import { generateProducts } from "./markups/productsMarkup.js";
import { addToCart } from "../utils/addToCart.js";

const relatedProductContainer = document.querySelector('.list_prod');

const params = new URLSearchParams(window.location.search);
const idProd = params.get('id');
const cateProd = +params.get('cate');

function adjustQuantity(btn) {
    const inputQuantity = document.querySelector('.ip-qtt');
    let currQuantity = +inputQuantity.value;

    if (btn === 'dec' && currQuantity < 2) return;

    btn === 'dec' ? --currQuantity : ++currQuantity;

    inputQuantity.value = currQuantity;
}

function handleControl() {
    const decBtn = document.querySelector('.pro_qty .dec');
    const incBtn = document.querySelector('.pro_qty .inc');
    decBtn.addEventListener('click', () => adjustQuantity('dec'));
    incBtn.addEventListener('click', () => adjustQuantity('inc'));

    const mainImage = document.querySelector('.main_pic img');
    const smallImages = document.querySelectorAll('.pic_col img');

    smallImages.forEach(img => img.addEventListener('click', function () {
        mainImage.src = img.src;
    }));
}

async function init() {
    // Generate details product
    await generateNavigation(cateProd);
    await generateImagesProduct(idProd);
    await generateInfoProduct(idProd);

    addToCart('.add_cart');
    handleControl();

    // Generate related products
    const orgProducts = await getProducts();

    const filteredProducts = orgProducts.filter(product => product.category === cateProd && product.id !== idProd);

    await generateProducts(relatedProductContainer, filteredProducts.slice(0, 4));
    addToCart();
}

init();