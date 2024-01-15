import { getBlogs } from "./api/getBlogs.js";
import { generateBlogs } from "./markups/blogsMarkup.js";
import { generateHighlightCategories, generateMenuCategories } from "./markups/categoriesMarkup.js";
import { generateProducts } from "./markups/productsMarkup.js";

// Change hot products
const hotProductsControl = document.querySelector('.hot_product .list_cate');
const hotProductContainer = document.querySelector('.list_prod');
generateProducts(hotProductContainer);

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

// Add cart btn event
document.querySelector('.list_prod').addEventListener('click', function (e) {
    e.preventDefault();

    const addCartBtn = e.target;

    if (!addCartBtn.hasAttribute('data-id')) return;

    const curId = +addCartBtn.dataset.id;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let itemExists = false;

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];

        if (item.id === curId) {
            item.quantity++;
            itemExists = true;
            break;
        }
    }

    if (!itemExists) {
        const newItem = {
            id: curId,
            quantity: 1,
        };
        cart.push(newItem);
    }

    document.querySelector('.cart_site li:nth-child(2) span').innerText = cart.length;

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(localStorage.getItem('cart') || []);
});
