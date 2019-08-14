import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AddToShoppingCartFormComponent } from './add-to-shopping-cart-form/add-to-shopping-cart-form.component';
import { ShoppingCartCommonEffects } from './state/shopping-cart-common.effects';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        EffectsModule.forFeature([ShoppingCartCommonEffects])
    ],
    providers: [
        ShoppingCartCommonEffects
    ],
    declarations: [
        AddToShoppingCartFormComponent
    ],
    exports: [
        AddToShoppingCartFormComponent
    ]
})
export class ShoppingCartCommonModule {}
