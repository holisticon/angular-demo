import { Resource } from '@holisticon/resource';
import { createResourceBlueprintBuilder, resourceUri } from '@holisticon/resource/test';
import { BlueprintFactory } from '@ngxp/builder';
import { commerce, image, lorem, random } from 'faker';
import { ShoppingCartItem } from '../../lib/domain/shopping-cart';

const minItemQty = 1;
const maxItemQty = 5;

const shoppingCartItemBlueprintFactory: BlueprintFactory<ShoppingCartItem> = () => {
    return {
        productName: () => commerce.productName(),
        productDescription: () => lorem.paragraph(),
        price: () => random.number({ min: 0.01, max: 99.99, precision: 0.01 }),
        image: () => `${image.food()}?${random.uuid()}`,
        product: () => resourceUri,
        quantity: () => random.number({ min: minItemQty, max: maxItemQty, precision: 1 })
    };
};
export const shoppingCartItemBuilder = createResourceBlueprintBuilder(shoppingCartItemBlueprintFactory);

export const shoppingCartItem: Resource<ShoppingCartItem> = shoppingCartItemBuilder().freeze().build();
