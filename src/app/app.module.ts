import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';

import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, CoreModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
