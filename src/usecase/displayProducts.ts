import { ProductRepository } from "../domain/productRepository";

export async function displayProducts(repository: ProductRepository) {
    const products = await repository.findAll(0, 2);
    console.log("Products:", products);
}