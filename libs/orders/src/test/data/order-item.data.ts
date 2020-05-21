import { BlueprintFactory } from '@ngxp/builder';
import { Resource } from '@ngxp/resource';
import { createResourceBlueprintBuilder, resourceUri } from '@ngxp/resource/test';
import { commerce, image, lorem, random } from 'faker';
import { OrderItem } from '../../lib/domain/order';

const minItemQty = 1;
const maxItemQty = 5;

const orderItemBlueprintFactory: BlueprintFactory<OrderItem> = () => {
    return {
        productName: () => commerce.productName(),
        productDescription: () => lorem.paragraph(),
        price: () => random.number({ min: 0.01, max: 99.99, precision: 0.01 }),
        image: () => `${image.food()}?${random.uuid()}`,
        product: () => resourceUri,
        quantity: () => random.number({ min: minItemQty, max: maxItemQty, precision: 1 })
    };
};
export const orderItemBuilder = createResourceBlueprintBuilder(orderItemBlueprintFactory);

export const orderItem: Resource<OrderItem> = orderItemBuilder().freeze().build();
export const orderItems: Resource<OrderItem>[] = orderItemBuilder().freeze().buildMany(5);
