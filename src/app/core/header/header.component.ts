import { Component, OnInit } from '@angular/core';
import { AuthLoginService } from 'src/app/auth/auth-login.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedInUser: User = JSON.parse(localStorage.getItem('appUser') || '');
  constructor(public loginService: AuthLoginService) { }

  ngOnInit(): void {
  }

}
