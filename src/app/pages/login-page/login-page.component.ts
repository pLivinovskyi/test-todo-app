import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  loginUser() {
    const user = {id: 1, name: 'test@mail.com', token: 'json-web-token'};
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigate(['dashboard']);
  }
}
