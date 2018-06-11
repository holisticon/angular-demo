import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileCommonModule } from '@luchsamapparat/user-profile-common';
import { EffectsModule } from '@ngrx/effects';
import { OrdersCommonService } from './orders-common.service';
import { PlaceOrderFormComponent } from './place-order-form/place-order-form.component';
import { OrdersCommonEffects } from './state/orders-common.effects';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        EffectsModule.forFeature([OrdersCommonEffects]),
        UserProfileCommonModule
    ],
    providers: [
        OrdersCommonEffects,
        OrdersCommonService
    ],
    declarations: [
        PlaceOrderFormComponent
    ],
    exports: [
        PlaceOrderFormComponent
    ]
})
export class OrdersCommonModule {}
