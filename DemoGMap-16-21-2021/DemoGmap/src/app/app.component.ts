import { Component } from '@angular/core'
import {Loader} from "@googlemaps/js-api-loader"
import {TranslateService} from "@ngx-translate/core";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DemoGmap';
  constructor(public translate: TranslateService) {
    translate.addLangs(['vie', 'en'])
    translate.setDefaultLang('vie');
  }
}
