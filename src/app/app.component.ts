import { Component, OnInit } from '@angular/core';
import { ClrFocusOnViewInit } from '@clr/angular';

import { stringify } from 'querystring';
import { Router, ActivatedRoute } from '@angular/router';
import {ConfigService} from 'src/app/services/config-service.service';
import {AuthenticationService} from 'src/app/_services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Top Trader';
  txtStatus: string;
  isAdmin: boolean;
  user: any;

  navArrayAdmin = [
    {'menuLink' : 'instruments', 'menumenuName' : 'Instruments'},
    {'menuLink' : 'portfolio', 'menumenuName' : 'Portfolio'},
    {'menuLink' : 'login', 'menumenuName' : 'Login'},

  ];

  constructor(
  private router: Router,
  private authenticationService: AuthenticationService,
  ) {

                // Wymuszaj logowanie
   if (!this.authenticationService.currentUserValue) {
        this.router.navigate(['login']);
   }
   if (this.authenticationService.currentUserValue) {
    this.user = this.authenticationService.currentUserValue;
    this.isAdmin = this.user.isAdmin;

   }

  }

  ngOnInit(): void {

    this.isAdmin = false;
    if (this.authenticationService.currentUserValue) {
      this.user = this.authenticationService.currentUserValue;
      this.isAdmin = this.user.isAdmin;
      }
  }

}
