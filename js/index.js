import { getBlogs } from "./api/getBlogs.js";
import { generateBlogs } from "./markups/blogsMarkup.js";
import { generateHighlightCategories, generateMenuCategories } from "./markups/categoriesMarkup.js";
import { generateProducts } from "./markups/productsMarkup.js";


// Toggle category bar 
const barCategory = document.querySelector('.toggle');
const menuCate = document.querySelector('.list_cate');
barCategory.addEventListener('click', function () {
    if (menuCate.style.maxHeight) {
        menuCate.style.maxHeight = null;
    } else {
        menuCate.style.maxHeight = menuCate.scrollHeight + 'px';
    }
});

// Change hot products
const hotProductsControl = document.querySelector('.hot_product .list_cate');
hotProductsControl.addEventListener('click', function (e) {
    const control = e.target;

    if (!control.hasAttribute('data-list')) return;

    hotProductsControl.querySelector('li.active').classList.remove('active');
    control.classList.add('active');

    generateProducts(control.dataset.list);
});

generateProducts();
generateMenuCategories();
generateHighlightCategories();
getBlogs();
generateBlogs();