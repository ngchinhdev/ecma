import { getCategories } from "../../api/apiCategories.js";
import { loader2 } from "../../utils/loader.js";
import handleAddCategory from "./CategoryAdd.js";
import handleUpdateCategory from "./CategoryUpdate.js";
import handleDeleteCategory from "./categoryDelete.js";

function generateMarkup(categoriesData, container) {
    const markup = `<div class="nav">
                <div class="above_table">
                    <div class="ctg_name">
                        <strong>Danh mục</strong>
                    </div>
                </div>
                <div class="add-new">
                    <span >+ Thêm mới</span>
                </div>
            </div>
            <table border="1">
                <tr>
                    <th>Mã danh mục</th>
                    <th>Tên danh mục</th>
                    <th>Hình ảnh</th>
                    <th>Thao tác</th>
                </tr>
                ${categoriesData.map(markupRow).join('')}
            </table>`;

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

function markupRow(cate, index) {
    return `<tr>
                <td>
                    ${index + 1}
                </td>
                <td>
                    ${cate.name}
                </td>
                <td>
                    <img src="images/products/${cate.image}" alt="${cate.name}">
                </td>
                <td>
                    <div class="last-td">
                        <span data-id=${cate.id} class="change-btn">Sửa</span>
                        <span data-id=${cate.id} class="del-btn">Xóa</span>
                    </div>
                </td>
            </tr>`;
}

export default async function initCategories(container) {
    container.innerHTML = '';

    await loader2(container, 500);
    const categoriesData = await getCategories();

    generateMarkup(categoriesData, container);

    const addNewBtn = document.querySelector('.add-new span');
    const table = document.querySelector('table');

    addNewBtn.addEventListener('click', async function () {
        await handleAddCategory(container);
    });

    table.addEventListener('click', async function (e) {
        const btn = e.target;

        if (btn.classList.contains('del-btn')) {
            const idCate = btn.dataset.id;

            await handleDeleteCategory(idCate, container);
        }

        if (btn.classList.contains('change-btn')) {
            const idCate = btn.dataset.id;

            await handleUpdateCategory(idCate, container);
        }
    });
}