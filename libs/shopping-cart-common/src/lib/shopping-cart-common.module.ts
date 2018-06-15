import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ShoppingCartCommonEffects } from './state/shopping-cart-common.effects';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        EffectsModule.forFeature([ShoppingCartCommonEffects])
    ],
    providers: [
        ShoppingCartCommonEffects
    ],
    declarations: []
})
export class ShoppingCartCommonModule {}
