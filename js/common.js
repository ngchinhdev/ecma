import { generateMenuCategories } from "./markups/categoriesMarkup.js";
import { generateProducts } from "./markups/productsMarkup.js";
import { updateQuantityCartHeader } from "./utils/updateHeader.js";

const barCategory = document.querySelector('.toggle');
const menuCate = document.querySelector('.list_cate');
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

// Toggle category bar 
barCategory.addEventListener('click', function () {
    if (menuCate.style.maxHeight) {
        menuCate.style.maxHeight = null;
    } else {
        menuCate.style.maxHeight = menuCate.scrollHeight + 'px';
    }
});

function search() {
    console.log(searchBox.value);
    window.location.href = `product.html?query=${searchBox.value}`;
}

searchBtn.addEventListener('click', search);

generateMenuCategories();
updateQuantityCartHeader();