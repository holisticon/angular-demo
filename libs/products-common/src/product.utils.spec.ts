import { Product, getProductId } from "@luchsamapparat/products-common";

describe('productUtils', () => {
    const product: Product = <any> {
        _id: 'id',
        description: '',
        image: '',
        name: '',
        price: 0
    };

    describe('getProductId', () => {
        it('returns the ID of the given product', () => {
            expect(getProductId(product)).toBe(product['_id']);
        });
    });

});
