import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {User} from 'src/app/_models/user';
import { Router, ActivatedRoute } from '@angular/router';
import {ConfigService} from 'src/app/services/config-service.service';
import {AuthenticationService} from 'src/app/_services/authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: boolean;
  user: User;
  isSaved: boolean;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router

    ) {
            //this.authenticationService.logout();

            // redirect to home if already logged in
            if (this.authenticationService.currentUserValue) {
              this.router.navigate(['/']);
            }
  }

  ngOnInit(): void {
    this.resetForm();
    this.error = false;
    this.user = new User();
    this.user.account = '';
    this.user.password = '';
    this.user.email = '';
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.isAdmin = false;
    this.isSaved = false;
  }

  resetForm(form?: NgForm){
    if (form != null) {
      form.resetForm();
    }
  }
  save()
  {
    this.isSaved = true;
    this.authenticationService.log_in(this.user).subscribe((data: any) => {

      this.user = data;
      this.isSaved = false;
      if (this.user.trader_id === 0)
      {
        this.error = true;
      }
      else
      {
        this.error = false;

        if (this.user.account === '9999') {
          this.user.isAdmin = true;
        }
        this.authenticationService.logAuth(this.user);
        this.router.navigate(['levels']);
      }

      }
    );


  }
}
