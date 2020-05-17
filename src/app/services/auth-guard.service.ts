import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;
    if (user && user.token) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
