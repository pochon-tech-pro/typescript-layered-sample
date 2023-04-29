import { JsonProductRepository } from "./infrastructure/jsonProductRepository";
import { registerProducts } from "./usecase/registerProducts";
import { ProductActor } from "./infrastructure/productActor";
import { displayProducts } from "./usecase/displayProducts";

(async () => {
    const { productRepository } = await bootstrap();

    const arg = process.argv[2];
    if (arg === 'get') {
        await displayProducts(productRepository);
    } else if (arg === 'post') {
        const tasks = [
            registerProducts(productRepository, 3),
            registerProducts(productRepository, 3),
        ];    
        await Promise.all(tasks);

    } else {
        console.log('Invalid argument. Use "get" or "post".');
    }
})();

// DIコンテナの代わり
async function bootstrap() {
    const productActor = await ProductActor.create();
    const productRepository = new JsonProductRepository(productActor);

    const registory = {
        productRepository
    };
    return registory;    
}