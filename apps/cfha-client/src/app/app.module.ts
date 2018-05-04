import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NxModule } from '@nrwl/nx';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
    imports: [
        BrowserModule,
        NxModule.forRoot(),
        RouterModule.forRoot([
            { path: 'products', loadChildren: '@luchsamapparat/products/products#ProductsModule' },
            { path: '', loadChildren: '@luchsamapparat/homepage#HomepageModule'},
            { path: 'shopping-cart', loadChildren: '@luchsamapparat/shopping-cart/shopping-cart#ShoppingCartModule' }
        ], { initialNavigation: 'enabled' })
    ],
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
