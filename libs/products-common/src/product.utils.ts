import { Product } from "./product.model";

export function getProductId(product: Product) {
    return product['_id'];
}
