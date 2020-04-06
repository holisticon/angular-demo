import { BlueprintFactory } from '@ngxp/builder';
import { productBuilder } from '@ngxp/products/test';
import { getUri, Resource } from '@ngxp/resource';
import { createResourceBlueprintBuilder } from '@ngxp/resource/test';
import { random } from 'lodash-es';
import { OrderItem } from '../../lib/order.model';

const minItemQty = 1;
const maxItemQty = 5;

const orderItemBlueprintFactory: BlueprintFactory<OrderItem> = () => {
    const product = productBuilder().freeze().build();
    return {
        productName: () => product.productName,
        productDescription: () => product.productDescription,
        price: () => product.price,
        product: () => getUri(product),
        quantity: () => random(minItemQty, maxItemQty)
    };
};
export const orderItemBuilder = createResourceBlueprintBuilder(orderItemBlueprintFactory);

export const orderItem: Resource<OrderItem> = orderItemBuilder().freeze().build();
