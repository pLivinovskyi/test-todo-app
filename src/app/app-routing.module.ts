import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardPageComponent} from './pages/dashboard-page/dashboard-page.component';
import {AuthGuardService} from './services/auth-guard.service';
import {LoginPageComponent} from './pages/login-page/login-page.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginPageComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
