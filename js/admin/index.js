import initCategories from "./categories/CategoryRow.js";
import initProducts from "./products/productRow.js";

const sideBar = document.querySelector('.sidebar_menu');
const mainContainer = document.querySelector('main');

// Side bar handle
sideBar.addEventListener('click', function (e) {
    e.preventDefault();

    const btn = e.target;

    if (!btn.hasAttribute('data-page')) return;

    sideBar.querySelector('.active').classList.remove('active');
    btn.closest('li').classList.add('active');
    const page = btn.dataset.page;

    handleRenderContent(page);
});

// Main view handle
async function handleRenderContent(page) {
    if (page === 'category') {
        await initCategories(mainContainer);
    }

    if (page === 'product') {
        await initProducts(mainContainer);
    }
}
