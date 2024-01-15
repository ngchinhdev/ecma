import { getBlogs } from "../api/getBlogs.js";
import { loader } from "../utils/loader.js";

function formatDate(value) {
    const date = new Date(value);

    const day = date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 9 ? '0' + day : day}/${month < 9 ? '0' + month : month}/${year}`;
}

export async function generateBlogs(container) {
    container.innerHTML = '';
    await loader(container);

    const blogs = await getBlogs();

    let markup = '';

    blogs.map(blog => {
        markup += `<div class="blog_col">
                    <div class="blog_item">
                        <div class="blog_pic">
                            <img src="./images/blogs/${blog.thumbnail}" alt="${blog.title}">
                        </div>
                        <div class="blog_text">
                            <div class="cate_blog">${blog.category}</div>
                            <ul>
                                <li><i class="fa fa-calendar-o"></i>${formatDate(blog.createAt)}</li>
                                <li><i class="fa fa-comment-o"></i> ${blog.comments}</li>
                            </ul>
                            <h5><a href="#">${blog.title}</a></h5>
                            <p>${blog.contents}</p>
                        </div>
                    </div>
                </div>`;
    });

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}