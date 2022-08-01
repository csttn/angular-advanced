import { HttpClientModule } from '@angular/common/http';
import {registerLocaleData} from "@angular/common"
import {BrowserAnimationsModule}  from '@angular/platform-browser/animations'
import { InMemoryDataService } from './pages/in-memory-database';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import localePt from '@angular/common/locales/pt';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt'} ],
  bootstrap: [AppComponent],
})
export class AppModule {}
