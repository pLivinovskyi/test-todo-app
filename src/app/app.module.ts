import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardPageComponent} from './pages/dashboard-page/dashboard-page.component';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatDialogModule, MatTableModule} from '@angular/material';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    TodoListComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
