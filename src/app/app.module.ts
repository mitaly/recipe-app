import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './shared/alert/alert.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AppRoutingModule } from './app-routing.module';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent],
  providers: [LoggingService]  
})
export class AppModule { }
