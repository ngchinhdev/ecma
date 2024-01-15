import { generateMenuCategories } from "./markups/categoriesMarkup.js";
import { updateQuantityCartHeader } from "./utils/updateHeader.js";

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

generateMenuCategories();
updateQuantityCartHeader();