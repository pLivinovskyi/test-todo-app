import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {PreviewItemDialogComponent} from '../../components/dialogs/preview-item-dialog/preview-item-dialog.component';
import {DialogTypes} from '../../enums';
import {DataProviderService} from '../../services/data-provider.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor(private dialog: MatDialog, private dataProviderService: DataProviderService) {
  }

  ngOnInit() {
  }

  createRecord() {
    const dialog = this.dialog.open(PreviewItemDialogComponent, {
      data: {type: DialogTypes.CREATE}
    });
    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.dataProviderService.createRecord(res.values)
      }
    })
  }
}
