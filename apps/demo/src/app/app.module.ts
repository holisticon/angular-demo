import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
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
            { path: 'products', loadChildren: () => import('@ngxp/products').then(m => m.ProductsModule) },
            { path: 'shopping-cart', loadChildren: () => import('@ngxp/shopping-cart').then(m => m.ShoppingCartModule) },
            { path: 'user-profile', loadChildren: () => import('@ngxp/user-profile').then(m => m.UserProfileModule) },
            { path: 'orders', loadChildren: () => import('@ngxp/orders').then(m => m.OrdersModule) }
        ], { initialNavigation: 'enabled' }),
        StoreModule.forRoot(
            { router: routerReducer },
            {
                runtimeChecks: {
                    strictStateImmutability: true,
                    strictActionImmutability: true,
                    strictActionSerializability: true,
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
        })
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
