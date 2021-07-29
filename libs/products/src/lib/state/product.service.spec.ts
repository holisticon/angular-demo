import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { product, products } from '@ngxp/products/test';
import { getUri } from '@ngxp/resource';
import { ProductService } from './product.service';

describe('ProductService', () => {
    let productService: ProductService;
    let httpController: HttpTestingController;

    const queryString = 'query';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ProductService
            ]
        });

        productService = TestBed.inject(ProductService);
        httpController = TestBed.inject(HttpTestingController);
    });

    describe('searchProducts', () => {
        it('loads products matching the given query from the backend', () => {
            productService.searchProducts(queryString)
                .subscribe(searchResults => {
                    expect(searchResults).toBe(products);
                });

            const request = httpController.expectOne(`https://webapp-demos-api.azurewebsites.net/products?queryString=${queryString}`);

            expect(request.request.method).toEqual('GET');

            request.flush(products);

            httpController.verify();
        });
    });

    describe('loadProduct', () => {
        it('loads the product with the given ID from the backend', () => {
            const productUri = getUri(product);
            productService.loadProduct(productUri)
                .subscribe(returnedProduct => {
                    expect(returnedProduct).toBe(product);
                });

            const request = httpController.expectOne(productUri);

            expect(request.request.method).toEqual('GET');

            request.flush(product);

            httpController.verify();
        });
    });

});
