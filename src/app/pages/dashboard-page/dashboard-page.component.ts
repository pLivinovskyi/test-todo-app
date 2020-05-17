import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {PreviewItemDialogComponent} from '../../components/dialogs/preview-item-dialog/preview-item-dialog.component';
import {DialogTypes} from '../../enums';
import {DataProviderService} from '../../services/data-provider.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor(private dialog: MatDialog, private dataProviderService: DataProviderService, private router: Router) {
  }

  ngOnInit() {
  }

  createRecord() {
    const dialog = this.dialog.open(PreviewItemDialogComponent, {
      width: '450px',
      data: {type: DialogTypes.CREATE}
    });
    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.dataProviderService.createRecord(res.values);
      }
    });
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
