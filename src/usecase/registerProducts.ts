import { Product } from "../domain/product";
import { ProductRepository } from "../domain/productRepository";

export async function registerProducts(repository: ProductRepository, loopcnt: number) {
    for (let i = 0; i < loopcnt; i++) {
        const product = new Product('', `Name-${Math.round(Math.random()*100)}`);
        repository.save(product);
    }
}
