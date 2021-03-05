import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  clickLogout(){
    if (this.authenticationService.currentUserValue) {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }
  }

  clickNo(){
    this.router.navigate(['/']);
  }

}
