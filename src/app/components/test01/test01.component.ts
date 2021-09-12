import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test01',
  templateUrl: './test01.component.html',
  styleUrls: ['./test01.component.css']
})
export class Test01Component {
  users = [
  ];

  selected = this.users[1];
  Alert1 = 'Alert 1';

  clik1(uu){
    this.selected = uu;
    this.Alert1 = 'Kliniecie i alert next';
  }

  click2(uu)
  {
  }
}
