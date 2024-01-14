import { getData } from "./getData.js";

export async function getBlogs() {
    const posts = await getData('blogs');

    console.log(posts);
    return posts;
}
