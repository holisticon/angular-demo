import { Blueprint } from '@ngxp/builder';
import { Product } from '@ngxp/products-common';
import { Resource } from '@ngxp/resource';
import { createResourceBlueprintBuilder } from '@ngxp/resource/test';
import * as faker from 'faker';
import { sampleSize } from 'lodash-es';
import { SearchResults } from '../../lib/product.model';

const productBlueprint: Blueprint<Product> = {
    productName: () => faker.commerce.productName(),
    productDescription: () => faker.lorem.paragraph(),
    price: () => faker.random.number({ min: 0.01, max: 99.99, precision: 0.01 }),
    image: () => `${faker.image.food()}?${faker.random.uuid()}`
};
export const productBuilder = createResourceBlueprintBuilder(productBlueprint);

export const product: Resource<Product> = productBuilder().freeze().build();
export const products: Resource<Product>[] = productBuilder().freeze().buildMany(100);

const totalResults = products.length -50;
export const searchResults: SearchResults = {
    products: sampleSize(products, totalResults),
    totalResults
};
