import { Product } from "../domain/product";

export interface ProductRepository {
    save(product: Product): void;
    findAll(offset: number, limit: number): Promise<Product[]>;
}