import { generateBlogs } from "./markups/blogsMarkup.js";

const blogContainer = document.querySelector('.blog_row');

generateBlogs(blogContainer);