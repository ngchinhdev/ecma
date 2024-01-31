import { loader2 } from "../../utils/loader.js";

function generateAddMarkup(container) {
    const markup = `<form class="sub_main" action="">
                        <div class="nav">
                            <div class="above_table">
                                <div class="ctg_name">
                                    <strong>Thêm sản phẩm</strong>
                                </div>
                            </div>
                            <div class="add-new">
                            </div>
                        </div>
                        <div class="add_prod add_common">
                            <div class="field">
                                <label for="name">Tên sản phẩm</label>
                                <input type="text" id="name" name="name" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="price">Giá sản phẩm</label>
                                <input type="number" id="price" name="price" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="orgPrice">Giá gốc</label>
                                <input type="number" id="orgPrice" name="orgPrice" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="quantity">Số lượng</label>
                                <input type="number" id="quantity" name="quantity" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="mass">Khối lượng</label>
                                <input type="text" id="mass" name="mass" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="desc">Mô tả sản phẩm</label>
                                <textarea name="desc" id="desc" rows="10"></textarea>
                            </div>
                            <div class="field">
                                <label for="image">Hình ảnh</label>
                                <input type="file" id="image" name="image" multiple>
                            </div>
                        </div>
                        <div>
                            <button class="btn-add">Thêm</button>
                        </div>
                    </form>`;

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

export default async function handleAddProduct(container) {
    container.innerHTML = '';
    await loader2(container, 500);
    generateAddMarkup(container);

    const formAdd = document.querySelector('form');

    formAdd.addEventListener('submit', async (e) => {
        e.preventDefault();

        const form = new FormData(formAdd);
        const formData = Object.fromEntries(form);

        if (!formData.name || !formData.image.name) {
            alert('Vui lòng nhập đầy đủ các trường!');
            return;
        }

        const isAdd = confirm('Xác nhận thêm danh mục?');

        if (!isAdd) return;

        await addCategory({ ...formData, image: formData.image.name });
        await initCategories(container);
    });
}

