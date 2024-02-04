import { getProducts } from "../api/apiProducts.js";
import { generateImagesProduct, generateInfoProduct } from "./markups/detailsMarkup.js";
import { generateNavigation } from "./markups/navigationMarkup.js";
import { generateProducts } from "./markups/productsMarkup.js";
import { addToCart } from "../utils/addToCart.js";
import { updateHeader } from "../utils/updateHeader.js";

const relatedProductContainer = document.querySelector('.list_prod');

const params = new URLSearchParams(window.location.search);
const idProd = params.get('id');
const cateProd = +params.get('cate');

let currQuantity = 1;

function adjustQuantity(btn) {
    const inputQuantity = document.querySelector('.ip-qtt');

    if (btn === 'dec' && currQuantity < 2) return;

    btn === 'dec' ? --currQuantity : ++currQuantity;

    inputQuantity.value = currQuantity;

    const buyNowBtn = document.querySelector('.buy_now');
    buyNowBtn.href = `checkout.html?id=${idProd}&quantity=${currQuantity}`;
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

    handleControl();
    // addToCart('.add_cart', currQuantity); Does not work?????

    document.querySelector('.add_cart').addEventListener('click', async function (e) {
        const addCartBtn = e.target;

        if (!addCartBtn.hasAttribute('data-id')) return;

        e.preventDefault();

        const curId = +addCartBtn.dataset.id;

        const { price } = await getProducts(curId);

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let itemExists = false;

        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];

            if (item.id === curId) {
                item.quantity += currQuantity;
                itemExists = true;
                break;
            }
        }

        if (!itemExists) {
            const newItem = {
                id: curId,
                quantity: currQuantity,
                price
            };
            cart.push(newItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        updateHeader();
    });




    // Generate related products
    const orgProducts = await getProducts();

    const filteredProducts = orgProducts.filter(product => product.category === cateProd && product.id !== idProd);

    await generateProducts(relatedProductContainer, filteredProducts.slice(0, 4));
    addToCart();
}

await init();
