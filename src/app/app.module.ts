import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // ✅ Import essentiel pour ngModel

import { AppComponent } from './app.component';
import { AddMovieComponent } from './add-movie/add-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    AddMovieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule  // ✅ ngModel dépend de ce module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
