import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient,HttpClientModule} from '@angular/common/http'
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';


export function  httpTranslateLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}

@Injectable({ providedIn: 'root' })
export class TranslationResolverService implements Resolve<any> {
  constructor(private translateService: TranslateService) {}

  resolve(): Observable<any> {
    return this.translateService.getTranslation(
      this.translateService.currentLang
    );
  }
}
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
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
