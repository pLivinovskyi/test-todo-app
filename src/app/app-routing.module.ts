import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardPageComponent} from './pages/dashboard-page/dashboard-page.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardPageComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
