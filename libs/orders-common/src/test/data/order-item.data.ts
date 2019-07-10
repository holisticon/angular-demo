import { BlueprintFactory } from '@ngxp/builder';
import { LineItem } from '@ngxp/common';
import { productBuilder } from '@ngxp/products-common/test';
import { getId, Resource } from '@ngxp/resource';
import { createResourceBlueprintBuilder } from '@ngxp/resource/test';
import { random } from 'lodash-es';

const minItemQty = 1;
const maxItemQty = 5;

const orderItemBlueprintFactory: BlueprintFactory<LineItem> = () => {
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

export const orderItem: Resource<LineItem> = orderItemBuilder().freeze().build();
