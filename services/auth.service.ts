import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { GeneralService } from './general.service';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private generalService: GeneralService,
    private authFirebase: AngularFireAuth,
  ) {}

  login(param) {
      this.loggedIn.next(true);
      this.router.navigate([param]);
  }

  public loginWithEmail(userObject) {
    let promise = new Promise((resolve, reject) => {
      this.authFirebase.auth.signInWithEmailAndPassword(userObject.email, userObject.password).then(
        success => {
          this.generalService.getAllDocuments('users').subscribe(
            users => {
              users.forEach((user: any) => {
                if (userObject.email === user.email) {

                  let object = {
                    email: user.email,
                    name: user.name,
                    role: user.role,
                  }
                  localStorage.setItem("data", JSON.stringify(object));
                  this.loggedIn.next(true);
                  resolve(true);
                }
              });
            }
          )
        }
      ).catch(
        error => console.log('error => ', error)
      )
    });
    return promise;
  }

  logout() {
    this.loggedIn.next(false);
    //this.router.navigate(['/login']);
  }

}