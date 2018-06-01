import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppEffects } from './state/app.effects';
import { RouterStateUrlSerializer } from './state/router-state-serializer';

@NgModule({
    imports: [
        BrowserModule,
        NxModule.forRoot(),
        RouterModule.forRoot([
            { path: 'products', loadChildren: '@luchsamapparat/products#ProductsModule' },
            { path: '', loadChildren: '@luchsamapparat/homepage#HomepageModule' },
            { path: 'shopping-cart', loadChildren: '@luchsamapparat/shopping-cart#ShoppingCartModule' },
            { path: 'user-profile', loadChildren: '@luchsamapparat/user-profile#UserProfileModule' },
            { path: 'orders', loadChildren: '@luchsamapparat/orders#OrdersModule' }
        ], { initialNavigation: 'enabled' }),
        StoreModule.forRoot(
            {},
            { metaReducers: !environment.production ? [storeFreeze] : [] }
        ),
        EffectsModule.forRoot([AppEffects]),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreRouterConnectingModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        AppEffects,
        { provide: RouterStateSerializer, useClass: RouterStateUrlSerializer }
    ]
})
export class AppModule { }
