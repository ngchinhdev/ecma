import { getData } from "./apiData.js";

export async function getBlogs() {
    const blogs = await getData('blogs');

    return blogs;
}

export async function getBlogsByCategory(cateId) {
    const blogs = await getData('blogs');

    const filteredBlogs = blogs.filter(blog => blog.category === cateId);

    return filteredBlogs;
}

export async function getCategoriesBlog() {
    const categoriesBlog = await getData('categoriesBlog');

    return [...categoriesBlog];
}

