import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthLoginService } from '../auth-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean;
  user: User = new User();
  constructor(private loginService: AuthLoginService, private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    this.loading = true;
    if (form.form.status === 'VALID') {
      this.loginService.login(this.user).subscribe({
        next: (res: any) => {
          this.loading = false;
          if (res.status === 200) {
            this.router.navigate(['/users']);
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    } else {
      this.loading = false;
    }
  }

}
