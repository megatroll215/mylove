import {Component} from '@angular/core';
import {LinkComponent} from './demo/view/link.component';

@Component({
    selector: 'app-footer',
    template: `
      <div class="layout-footer">
        <div class="clearfix">
          <span class="footer-text-left">PrimeNG Apollo</span>
          <span class="footer-text-right">All Rights Reserved</span>
        </div>
        <app-link-component></app-link-component>
      </div>

    `
})
export class AppFooterComponent {

}
