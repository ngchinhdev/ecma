import { getData } from "./apiData.js";

export async function getCategories() {
    const categories = await getData('categoriesProduct');

    return categories;
}

