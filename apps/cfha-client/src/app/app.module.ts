import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { NgxHypermediaClientModule } from '@luchsamapparat/ngx-hypermedia-client';

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot([{path: 'products', loadChildren: '@luchsamapparat/products#ProductsModule'}], { initialNavigation: 'enabled' }),
    NgxHypermediaClientModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
