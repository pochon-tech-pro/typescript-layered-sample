import * as fs from "fs";
import { Subject } from "rxjs";
import { DomainEvent } from "../domain/domainEvent";
import { Product } from "../domain/product";
import { ProductRegisteredEvent } from "../domain/productRegisteredEvent";
import { ProductRepository } from "../domain/productRepository";
import { Actor } from "./actor";

export class JsonProductRepository implements ProductRepository {
    private eventSubject = new Subject<DomainEvent>();

    constructor(actor: Actor) {
        this.eventSubject.subscribe((event) => {
            if (event.productRegisteredEvent) {
                actor.tell(event.productRegisteredEvent);
            }
        });
    }

    save(product: Product) {
        const event = new ProductRegisteredEvent(product);
        this.eventSubject.next({ productRegisteredEvent: event });
    }

    async findAll(offset: number, limit: number): Promise<Product[]> {
        const products = JSON.parse(await fs.promises.readFile("products.json", "utf-8")) as Product[];
        return products.slice(offset, offset + limit);
    }
}