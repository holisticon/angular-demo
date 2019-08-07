import { createAction, props } from '@ngrx/store';

export const searchProductsAction = createAction(
    '[Products] search products',
    props<{ query: string | null }>()
);
