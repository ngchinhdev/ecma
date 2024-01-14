import { getData } from "./getData.js";

export async function getCategories() {
    const data = await getData('products');

    const categories = new Set();
    const newCategories = [];

    data.forEach(product => {
        const categoryName = product.category;

        if (!categories.has(categoryName)) {
            categories.add(categoryName);

            newCategories.push({
                name: categoryName,
                image: product.images[0]
            });
        }
    });

    return newCategories;
}

