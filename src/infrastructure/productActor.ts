import * as fs from "fs";
import { Product } from "../domain/product";
import { ProductRegisteredEvent } from "../domain/productRegisteredEvent";
import { Actor } from "./actor";

export class ProductActor extends Actor {
    private products: Product[] = [];
    private nextId: number = 1;

    public static async create(): Promise<ProductActor> {
        const actor = new ProductActor();
        await actor.initializeNextId();
        return actor;
    }

    protected async receive(event: ProductRegisteredEvent): Promise<void> {
        const message = event.product;
        console.log("start task", message);
        message.id = `ID-${this.generateNextId()}`; // 連番のIDを生成
        this.products.push(message);
        await fs.promises.writeFile("products.json", JSON.stringify(this.products));
        console.log("done task", message);
    }

    private generateNextId(): number {
        return this.nextId++;
    }
    
    private async initializeNextId(): Promise<void> {
        try {
            const products = JSON.parse(await fs.promises.readFile("products.json", "utf-8"));
            this.nextId = Math.max(...products.map((p: Product) => parseInt(p.id.split('-')[1]))) + 1;
        } catch (error) {
            this.nextId = 1;
        }
    }
}