import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MovieModule } from './movieApp/movie.app.module';
import 'hammerjs';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MovieModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
