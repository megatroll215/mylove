import {Component, OnInit} from '@angular/core';
import {ChangeService} from '../service/changeservice';

@Component({
  templateUrl : './link.component.html',
  selector: 'app-link-component'
})


export class LinkComponent {

  link = ['Google', 'Wiki' , 'Twitter'];
  welcome;
  constructor() {
    this.welcome = new ChangeService();
  }
   showMess() {
alert(this.welcome.show());
  }
}
