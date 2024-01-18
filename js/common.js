import { generateMenuCategories } from "./markups/categoriesMarkup.js";
import { updateHeader } from "./utils/updateHeader.js";

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
    if (!searchBox.value) {
        searchBox.focus();
        return;
    }

    window.location.href = `product.html?query=${searchBox.value}`;
}

searchBtn.addEventListener('click', search);

await generateMenuCategories();
const paramsUrl = window.location.href;
if (paramsUrl.includes('index.html')) menuCate.style.maxHeight = menuCate.scrollHeight + 'px';
updateHeader();