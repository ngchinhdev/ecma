import { getData } from "./getData.js";

export async function getProducts(id = '') {
    const products = await getData(`products/${id}`);

    return products;
}
