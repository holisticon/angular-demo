import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ShoppingCartModule } from '../..';
import { ShoppingCartNavigationEffects } from './shopping-cart-navigation.effects';
import { ShoppingCartViews } from './shopping-cart.views';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
    imports: [
        CommonModule,
        ShoppingCartModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: ShoppingCartComponent, data: { view: ShoppingCartViews.Root } }
        ]),
        EffectsModule.forFeature([
            ShoppingCartNavigationEffects
        ])
    ],
    declarations: [
        ShoppingCartComponent
    ]
})
export class ShoppingCartRoutingModule { }
