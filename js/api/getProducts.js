import { getData } from "./getData.js";

export async function getProducts() {
    const products = await getData('products');

    return products;
}
