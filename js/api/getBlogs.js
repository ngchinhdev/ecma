import { getData } from "./getData.js";

export async function getBlogs() {
    const posts = await getData('blogs');

    return posts;
}
