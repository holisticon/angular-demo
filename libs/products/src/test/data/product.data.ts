import { ResourcePayload } from '@holisticon/resource';
import { createResourceBlueprintBuilder } from '@holisticon/resource/test';
import { Blueprint } from '@ngxp/builder';
import { commerce, image, lorem, random } from 'faker';
import { sampleSize } from 'lodash-es';
import { Product, SearchResults } from '../../lib/domain/product';

const productBlueprint: Blueprint<ResourcePayload<Product>> = {
    productName: () => commerce.productName(),
    productDescription: () => lorem.paragraph(),
    price: () => random.number({ min: 0.01, max: 99.99, precision: 0.01 }),
    image: () => `${image.food()}?${random.uuid()}`
};
export const productBuilder = createResourceBlueprintBuilder(productBlueprint);

export const product: Product = productBuilder().freeze().build();
export const products: Product[] = productBuilder().freeze().buildMany(100);

const totalResults = products.length - 50;
export const searchResults: SearchResults = {
    products: sampleSize(products, totalResults),
    totalResults
};
