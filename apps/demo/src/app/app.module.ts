import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppEffects } from './state/app.effects';
import { RouterStateUrlSerializer } from './state/router-state-serializer';
import { ServiceWorkerModule } from '@angular/service-worker';

export function logger(reducer) {
    return storeLogger()(reducer);
}

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule, // see https://github.com/angular/angular-cli/issues/10170
        NxModule.forRoot(),
        RouterModule.forRoot([
            { path: '', loadChildren: '@ngxp/homepage#HomepageModule' },
            { path: 'products', loadChildren: '@ngxp/products#ProductsModule' },
            { path: 'shopping-cart', loadChildren: '@ngxp/shopping-cart#ShoppingCartModule' },
            { path: 'user-profile', loadChildren: '@ngxp/user-profile#UserProfileModule' },
            { path: 'orders', loadChildren: '@ngxp/orders#OrdersModule' }
        ], { initialNavigation: 'enabled' }),
        StoreModule.forRoot(
            {},
            { metaReducers: !environment.production ? [logger, storeFreeze] : [] }
        ),
        EffectsModule.forRoot([AppEffects]),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreRouterConnectingModule,
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
        AppEffects,
        { provide: RouterStateSerializer, useClass: RouterStateUrlSerializer }
    ]
})
export class AppModule { }
