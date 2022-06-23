import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  getAllUsers() {
    return this.http.get(`https://my-app-a67a6.firebaseio.com/users.json`);
  }

  getUser(id: string) {
    return this.http.get(`https://my-app-a67a6.firebaseio.com/users/${id}.json`);
  }

  getDepartments() {
    return this.http.get(`https://my-app-a67a6.firebaseio.com/departments.json`);
  }

  createUser(user: User) {
    return this.http.post('https://my-app-a67a6.firebaseio.com/users.json', user);
  }

  editUser(user: User) {
    return this.http.put(`https://my-app-a67a6.firebaseio.com/users/${user.id}.json`, user);
  }

  removeUser(user: User) {
    return this.http.delete(`https://my-app-a67a6.firebaseio.com/users/${user.id}.json`);
  }

  createDepartments() {
    let deps: any =
      // {name:'Development'}
      // {name:'Accounting'}
      // {name:'Sales'}
      // {name:'Marketing'}
      { name: 'IT/Network' }

    return this.http.post('https://my-app-a67a6.firebaseio.com/departments.json', deps);
  }

  formValidation(form: NgForm, fieldName: string): any {
    switch (fieldName) {
      case 'username':
        if (form.form.controls['username'] && form.form.controls['username'].status === 'INVALID') {
          return 'Username: Must be not less than 4 characters.'
        }
        break;
      case 'password':
        if (form.form.controls['password'] && form.form.controls['password'].status === 'INVALID') {
          return 'Password: Must be not less than 8 characters or numbers and must contain at least one character capital, one number and one special character.'
        }
        break;
      case 'firstname':
        if (form.form.controls['firstname'] && form.form.controls['firstname'].status === 'INVALID') {
          return 'First name: Must start with character and not less than 5 characters.'
        }
        break;
      case 'lastname':
        if (form.form.controls['lastname'] && form.form.controls['lastname'].status === 'INVALID') {
          return 'Last name: Must start with character and not less than 5 characters.'
        }
        break;
      case 'email':
        if (form.form.controls['email'] && form.form.controls['email'].status === 'INVALID') {
          return 'Please provide a valid email. ex: name@company.com'
        }
        break;
      case 'phonenumber':
        if (form.form.controls['phonenumber'] && form.form.controls['phonenumber'].value) {
          let value = form.form.controls['phonenumber'].value;
          let allowed = ['010', '011', '012', '015'];
          if (value.length != 11) return 'Phone Number: Must start with 010,011,012,015 then 8 numbers';
          let substring = form.form.controls['phonenumber'].value.substring(0, 3);
          if (!allowed.includes(substring)) return 'Phone Number: Must start with 010,011,012,015 then 8 numbers';
        }
        break;
    }
  }


}
