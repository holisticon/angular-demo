import { Product } from "@luchsamapparat/products-common";
import { Blueprint, createBlueprintBuilder } from '@ngx-patterns/builder';
import * as faker from 'faker';
import { Resource } from "@luchsamapparat/common";
import { createResourceBlueprintBuilder } from "@luchsamapparat/common/test";

const productBlueprint: Blueprint<Product> = {
    name: () => faker.commerce.productName(),
    description: () => faker.lorem.paragraph(),
    price: () => faker.random.number({ min: 0.01, max: 99.99, precision: 0.01 }),
    image: () => `${faker.image.food()}?${faker.random.uuid()}`
};
debugger;
export const productBuilder = createResourceBlueprintBuilder(productBlueprint);

export const product: Resource<Product> = productBuilder().build();
export const products: Resource<Product>[] = productBuilder().buildMany(100);
