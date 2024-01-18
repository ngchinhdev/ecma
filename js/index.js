import { getProducts } from "./api/getProducts.js";
import { generateBlogs } from "./markups/blogsMarkup.js";
import { generateHighlightCategories } from "./markups/categoriesMarkup.js";
import { generateProducts } from "./markups/productsMarkup.js";
import { addToCart } from "./utils/addToCart.js";

const hotProductsControl = document.querySelector('.hot_product .list_cate');
const hotProductContainer = document.querySelector('.list_prod');
const blogContainer = document.querySelector('.blog .blog_row');

function handleNavControl(orgProducts) {
    hotProductsControl.addEventListener('click', async function (e) {
        const control = e.target;

        if (!control.hasAttribute('data-list')) return;

        hotProductsControl.querySelector('li.active').classList.remove('active');
        control.classList.add('active');

        const clickedFilter = control.dataset.list;
        const filteredProducts = orgProducts.filter(product => product.category === clickedFilter);

        await generateProducts(hotProductContainer, filteredProducts.length ? filteredProducts.slice(0, 8) : orgProducts);
    });
}

async function init() {
    await generateHighlightCategories();

    const orgProducts = await getProducts();

    await generateProducts(hotProductContainer, orgProducts.slice(0, 8));
    handleNavControl(orgProducts.slice(0, 8));
    addToCart();

    generateBlogs(blogContainer);
}

init()



