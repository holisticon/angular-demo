import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ShoppingCartModule } from '../shopping-cart.module';
import { ShoppingCartNavigationEffects } from './shopping-cart-navigation.effects';
import { ShoppingCartViews } from './shopping-cart.views';
import { ShoppingCartComponent, ShoppingCartModule as ShoppingCartComponentModule } from './shopping-cart/shopping-cart.component';

@NgModule({
    imports: [
        CommonModule,
        ShoppingCartModule,
        ShoppingCartComponentModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: ShoppingCartComponent, data: { view: ShoppingCartViews.Root } }
        ]),
        EffectsModule.forFeature([
            ShoppingCartNavigationEffects
        ])
    ]
})
export class ShoppingCartRoutingModule { }
