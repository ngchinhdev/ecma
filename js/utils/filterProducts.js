import { generatePagination, generateProducts, noResult } from "../markups/productsMarkup.js";

const shopProductContainer = document.querySelector('.list_prod');
const paginationContainer = document.querySelector('.product_pagination');
const totalResultLabel = document.querySelector('.total_results');
const filterSelectOptions = document.querySelector('.filter select');
const filterPrice = document.querySelector('.price.filter_side');

export function updateTotalResults(value) {
    totalResultLabel.innerText = `${value} Kết quả`;
}

export function filterIncDec(orgProducts, filteredProducts) {
    filterSelectOptions.addEventListener('change', async function () {
        paginationContainer.innerHTML = '';

        const type = filterSelectOptions.value;

        const products = filteredProducts.length ? filteredProducts : orgProducts;

        if (type === 'inc') {
            filteredProducts = products.slice().sort((a, b) => a.price - b.price);
        }

        if (type === 'dec') {
            filteredProducts = products.slice().sort((a, b) => b.price - a.price);
        }

        await generateProducts(shopProductContainer, filteredProducts.slice(0, 6));
        handlePagination(paginationContainer, filteredProducts);
    });
}

export function filterByPrice(orgProducts, filteredProducts) {
    let products = [];

    filterPrice.addEventListener('change', async function (e) {
        paginationContainer.innerHTML = '';

        products = !products.length ? orgProducts : products;

        const checkbox = e.target;

        if (!checkbox.classList.contains('price_checkbox')) return;

        const checkboxValue = JSON.parse(checkbox.value.replace(/'/g, '"'));

        let noChecked = false;

        if (!checkbox.checked) {
            if (checkboxValue[0] === 'under') {
                products = filteredProducts.filter(product => product.price > +checkboxValue[1]);
            }

            if (checkboxValue[0] === 'above') {
                products = filteredProducts.filter(product => product.price < +checkboxValue[1]);
            }

            if (!isNaN(+checkboxValue[0])) {
                products = filteredProducts.filter(product => product.price < +checkboxValue[0] || product.price >= +checkboxValue[1]);
            }

            const allCheckbox = document.querySelectorAll('.price_checkbox');
            noChecked = [...allCheckbox].every(checkbox => !checkbox.checked);
            if (noChecked) products = orgProducts;
        }

        if (checkbox.checked) {
            if (checkboxValue[0] === 'under') {
                products = [...filteredProducts, ...orgProducts.filter(product => product.price < +checkboxValue[1])];
            }

            if (checkboxValue[0] === 'above') {
                products = [...filteredProducts, ...orgProducts.filter(product => product.price > +checkboxValue[1])];
            }

            if (!isNaN(+checkboxValue[0])) {
                products = [...filteredProducts, ...orgProducts.filter(product => product.price >= +checkboxValue[0] && product.price < +checkboxValue[1])];
            }
        }

        filteredProducts = products;

        updateTotalResults(filteredProducts.length);
        if (!filteredProducts.length) return noResult(shopProductContainer, "Không có sản phẩm nào phù hợp.");

        await generateProducts(shopProductContainer, filteredProducts.slice(0, 6));
        handlePagination(paginationContainer, filteredProducts);

        if (noChecked) filteredProducts = [];
    });
}

export function handlePagination(container, orgProducts) {
    const perPage = 6;
    const totalPages = Math.ceil(orgProducts.length / perPage);

    generatePagination(container, totalPages, 0);

    container.addEventListener('click', async function (e) {
        const btn = e.target;

        if (!e.target.hasAttribute('data-page')) return;

        e.preventDefault();

        const curPage = +btn.dataset.page;
        const offset = curPage * perPage;
        const limit = offset + perPage;

        await generateProducts(shopProductContainer, orgProducts.slice(offset, limit));
        generatePagination(container, totalPages, curPage);
    });
}

