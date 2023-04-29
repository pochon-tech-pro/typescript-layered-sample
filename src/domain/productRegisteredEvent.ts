import { Product } from "./product";

export class ProductRegisteredEvent {
    constructor(public product: Product) {}
}