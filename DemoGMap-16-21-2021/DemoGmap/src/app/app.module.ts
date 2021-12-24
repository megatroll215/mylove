import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import {TranslateLoader,TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient,HttpClientModule} from '@angular/common/http'


export function  httpTranslateLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    HttpClientModule,

    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader:{
      provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps:[HttpClient]

      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
