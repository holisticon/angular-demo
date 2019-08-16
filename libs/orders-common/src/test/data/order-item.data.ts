import { BlueprintFactory } from '@ngxp/builder';
import { OrderItem } from '@ngxp/orders-common';
import { productBuilder } from '@ngxp/products-common/test';
import { getId, Resource } from '@ngxp/resource';
import { createResourceBlueprintBuilder } from '@ngxp/resource/test';
import { random } from 'lodash-es';

const minItemQty = 1;
const maxItemQty = 5;

const orderItemBlueprintFactory: BlueprintFactory<OrderItem> = () => {
    const product = productBuilder().freeze().build();
    return {
        name: () => product.name,
        description: () => product.description,
        price: () => product.price,
        product: () => getId(product),
        quantity: () => random(minItemQty, maxItemQty)
    };
};
export const orderItemBuilder = createResourceBlueprintBuilder(orderItemBlueprintFactory);

export const orderItem: Resource<OrderItem> = orderItemBuilder().freeze().build();
