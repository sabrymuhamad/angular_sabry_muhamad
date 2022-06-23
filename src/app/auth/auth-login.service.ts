import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  constructor(private router: Router) { }

  login(cred: User) {
    return new Observable(observer => {
      setTimeout(() => {
        localStorage.setItem('appUser', JSON.stringify(cred));
        observer.next(
          { status: 200, data: cred }
        );
      }, 1000);
    });
  }

  logOut() {
    localStorage.removeItem('appUser');
    this.router.navigate(['/']);
  }

}
