import { generateImagesProduct, generateInfoProduct } from "./markups/detailsMarkup.js";
import { generateProducts } from "./markups/productsMarkup.js";
import { addToCart } from "./utils/addToCart.js";

const params = new URLSearchParams(window.location.search);
const idProd = params.get('id');
const cateProd = params.get('cate');

await generateImagesProduct(idProd);
await generateInfoProduct(idProd);

function adjustQuantity(btn) {
    const inputQuantity = document.querySelector('.ip-qtt');
    let currQuantity = +inputQuantity.value;

    if (btn === 'dec' && currQuantity < 2) return;

    btn === 'dec' ? --currQuantity : ++currQuantity;

    inputQuantity.value = currQuantity;
}


const decBtn = document.querySelector('.pro_qty .dec');
const incBtn = document.querySelector('.pro_qty .inc');
decBtn.addEventListener('click', () => adjustQuantity('dec'));
incBtn.addEventListener('click', () => adjustQuantity('inc'));


const mainImage = document.querySelector('.main_pic img');
const smallImages = document.querySelectorAll('.pic_col img');

smallImages.forEach(img => img.addEventListener('click', function () {
    mainImage.src = img.src;
}));

const relatedProductContainer = document.querySelector('.list_prod');
await generateProducts(relatedProductContainer, cateProd);

addToCart('.add_cart');
addToCart()

