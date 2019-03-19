import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth,
    private generalService: GeneralService,
    public router: Router, ) {

  }


  login() {
    this.authService.loginWithEmail(this.user).then(
      succes => {
        let user = JSON.parse(localStorage.getItem('data'));
        switch (user.role) {
          case 'admin':
            this.authService.login('admin');

            break;
          case 'professional':
            this.authService.login('professional');

            break;
          case 'user':
            this.authService.login('client');

            break;
        }
      }
    )
  }

}