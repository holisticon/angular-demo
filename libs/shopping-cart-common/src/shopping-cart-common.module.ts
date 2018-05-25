import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { ShoppingCartService } from './shopping-cart.service';
import { LoadShoppingCartAction } from './state/shopping-cart.actions';
import { ShoppingCartEffects } from './state/shopping-cart.effects';
import { ShoppingCartState, initialState as shoppingCartInitialState, shoppingCartReducer } from './state/shopping-cart.reducer';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature('shoppingCart', shoppingCartReducer, { initialState: shoppingCartInitialState }),
        EffectsModule.forFeature([ShoppingCartEffects])
    ],
    providers: [
        ShoppingCartEffects,
        ShoppingCartService
    ],
    declarations: []
})
export class ShoppingCartCommonModule {
    constructor(
        store: Store<ShoppingCartState>
    ) {
        store.dispatch(new LoadShoppingCartAction());
    }
}
