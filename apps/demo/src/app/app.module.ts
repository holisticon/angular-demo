import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProductsStateModule } from '@ngxp/products/state';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppEffects } from './state/app.effects';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule, // see https://github.com/angular/angular-cli/issues/10170
        RouterModule.forRoot([
            { path: '', loadChildren: () => import('@ngxp/homepage').then(m => m.HomepageModule) },
            { path: 'products', loadChildren: () => import('@ngxp/products/views').then(m => m.ProductsRoutingModule) },
            { path: 'shopping-cart', loadChildren: () => import('@ngxp/shopping-cart/views').then(m => m.ShoppingCartRoutingModule) },
            { path: 'user-profile', loadChildren: () => import('@ngxp/user-profile/views').then(m => m.UserProfileRoutingModule) },
            { path: 'orders', loadChildren: () => import('@ngxp/orders/views').then(m => m.OrdersRoutingModule) }
        ]),
        StoreModule.forRoot(
            { router: routerReducer },
            {
                runtimeChecks: {
                    strictActionImmutability: true,
                    strictActionSerializability: true,
                    strictStateImmutability: true,
                    strictStateSerializability: true
                }
            }
        ),
        EffectsModule.forRoot([AppEffects]),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreRouterConnectingModule.forRoot({
            routerState: RouterState.Minimal
        }),
        ServiceWorkerModule.register('/ngsw-worker.js', {
            enabled: environment.production
        }),
        ProductsStateModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        AppEffects
    ]
})
export class AppModule { }
