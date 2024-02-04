import { generateMenuCategories } from "./markups/categoriesMarkup.js";
import { updateHeader } from "../utils/updateHeader.js";

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

// Search bar
function search() {
    if (!searchBox.value) {
        searchBox.focus();
        return;
    }

    window.location.href = `product.html?query=${searchBox.value}`;
}

searchBox.addEventListener('keyup', (e) => e.key !== 'Enter' ? null : search());
searchBtn.addEventListener('click', search);

await generateMenuCategories();

const paramsUrl = window.location.href;
if (paramsUrl.includes('index.html')) menuCate.style.maxHeight = menuCate.scrollHeight + 'px';
updateHeader();
if (paramsUrl.includes('query')) searchBox.value = paramsUrl.slice(paramsUrl.indexOf('=') + 1);

// Login status
let isLogin = localStorage.getItem('isLogin');

if (!isLogin) localStorage.setItem('isLogin', '');
if (isLogin) {
    const logoutBtn = document.querySelector('.logout');
    document.querySelector('.login.ic').innerHTML = `<span class="logged">Hi, ${isLogin}</span>`;
    document.querySelector('.logged').addEventListener('click', () => logoutBtn.classList.toggle('active'));

    logoutBtn.addEventListener('click', function () {
        localStorage.setItem('isLogin', '');
        window.location.href = 'index.html';
    });
}
