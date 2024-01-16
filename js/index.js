import { getBlogs } from "./api/getBlogs.js";
import { generateBlogs } from "./markups/blogsMarkup.js";
import { generateHighlightCategories, generateMenuCategories } from "./markups/categoriesMarkup.js";
import { generateProducts } from "./markups/productsMarkup.js";
import { addToCart } from "./utils/addToCart.js";

// Change hot products
const hotProductsControl = document.querySelector('.hot_product .list_cate');
const hotProductContainer = document.querySelector('.list_prod');
await generateProducts(hotProductContainer);

addToCart();

hotProductsControl.addEventListener('click', function (e) {
    const control = e.target;

    if (!control.hasAttribute('data-list')) return;

    hotProductsControl.querySelector('li.active').classList.remove('active');
    control.classList.add('active');

    generateProducts(hotProductContainer, control.dataset.list);
});


const blogContainer = document.querySelector('.blog .blog_row');
generateBlogs(blogContainer);


generateHighlightCategories();
getBlogs();
