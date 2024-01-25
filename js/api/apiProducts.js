import { getData } from "./apiData.js";

export async function getProducts(id = '') {
    const products = await getData(`products/${id}`);

    return products;
}
