import { getBlog } from "../../api/apiBlogs.js";
import { loader2 } from "../../utils/loader.js";

function generateUpdateMarkup(dataOld, container) {
    const markup = `<form class="sub_main" action="" method="post">
                        <div class="nav">
                            <div class="above_table">
                                <div class="ctg_name">
                                    <strong>Thêm bài viết</strong>
                                </div>
                            </div>
                            <div class="add-new">
                            </div>
                        </div>
                        <div class="add_prod add_common">
                            <div class="field">
                                <label for="title">Tiêu đề</label>
                                <input type="text" id="title" value="${dataOld.title}" name="title" class="w-100 cm">
                            </div>
                            <div class="field">
                                <label for="price">Nội dung</label>
                                <textarea name="contents" id="contents" rows="10">${dataOld.contents}</textarea>
                            </div>
                            <div class="field">
                                <label for="category">Danh mục</label>
                                <select name="category" id="category">
                                    ${[].map(cate => `<option value="${cate.id}">${cate.name}</option>`).join('')}
                                </select>
                            </div>
                            <div class="field">
                                <label for="image">Hình ảnh</label>
                                <input type="file" id="image" name="image">
                            </div>
                        </div>
                        <div>
                            <button class="btn-add">Cập nhật</button>
                        </div>
                    </form>`;

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

export default async function handleUpdateBlog(idBlog, container) {
    container.innerHTML = '';
    await loader2(container, 500);

    const dataOld = await getBlog(idBlog);
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

        await updateCategory(idBlog, { ...formData, image: formData.image.name ? formData.image.name : dataOld.image });
        await initCategories(container);
    });
}
