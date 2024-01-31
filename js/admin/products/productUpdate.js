import { getProducts } from "../../api/apiProducts.js";
import { loader2 } from "../../utils/loader.js";

function generateUpdateMarkup(dataOld, container) {
    const markup = `<form class="sub_main" action="">
                        <div class="nav">
                            <div class="above_table">
                                <div class="ctg_name">
                                    <strong>Cập nhật sản phẩm</strong>
                                </div>
                            </div>
                            <div class="add-new">
                            </div>
                        </div>
                        <div class="add_prod add_common">
                            <div class="field">
                                <label for="name">Tên sản phẩm</label>
                                <input type="text" id="name" value=${dataOld.name} name="name" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="price">Giá sản phẩm</label>
                                <input type="number" id="price" value=${dataOld.price} name="price" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="orgPrice">Giá gốc</label>
                                <input type="number" id="orgPrice" value=${dataOld.orgPrice} name="orgPrice" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="quantity">Số lượng</label>
                                <input type="number" id="quantity" value=${dataOld.quantity} name="quantity" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="mass">Khối lượng</label>
                                <input type="text" id="mass" value=${dataOld.mass} name="mass" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="desc">Mô tả sản phẩm</label>
                                <textarea name="desc" id="desc" rows="10">${dataOld.description}</textarea>
                            </div>
                            <div class="field">
                                <label for="image">Hình ảnh</label>
                                <input type="file" id="image" name="image" multiple>
                            </div>
                        </div>
                        <div>
                            <button class="btn-add">Cập nhật</button>
                        </div>
                    </form>`;

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

export default async function handleUpdateProduct(idProd, container) {
    container.innerHTML = '';
    await loader2(container, 500);

    const dataOld = await getProducts(idProd);
    generateUpdateMarkup(dataOld, container);

    const formAdd = document.querySelector('form');

    formAdd.addEventListener('submit', async (e) => {
        e.preventDefault();

        const form = new FormData(formAdd);
        const formData = Object.fromEntries(form);

        if (!formData.name) {
            alert('Vui lòng nhập đầy đủ các trường!');
            return;
        }

        const isAdd = confirm('Xác nhận chỉnh sửa danh mục?');

        if (!isAdd) return;

        await updateCategory(idProd, { ...formData, image: formData.image.name ? formData.image.name : dataOld.image });
        await initCategories(container);
    });
}
