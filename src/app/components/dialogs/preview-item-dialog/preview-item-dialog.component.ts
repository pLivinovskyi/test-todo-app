import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogTypes} from '../../../enums';
import {TodoItem} from '../../../interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '../../../services/confirmation-dialog.service';
import {DataProviderService} from '../../../services/data-provider.service';

@Component({
  selector: 'app-preview-item-dialog',
  templateUrl: './preview-item-dialog.component.html',
  styleUrls: ['./preview-item-dialog.component.scss']
})
export class PreviewItemDialogComponent implements OnInit {

  form: FormGroup;
  dialogTypes = DialogTypes;

  constructor(
    private matDialogRef: MatDialogRef<PreviewItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: DialogTypes, currentRow?: TodoItem },
    private confirmationDialogService: ConfirmationDialogService,
    private dataProviderService: DataProviderService) {
  }

  ngOnInit() {
    const data = this.data.currentRow ? this.data.currentRow : {} as TodoItem;
    this.form = this.createForm(data);
  }

  onSubmitForm(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.confirmationDialogService.openConfirmationDialog(this.data.type)
      .subscribe(isConfirmed => {
        if (isConfirmed) {
          this.closeDialog({type: DialogTypes.EDIT, values: form.value});
        }
      });
  }

  removeRecord(e): void {
    e.preventDefault();
    this.confirmationDialogService.openConfirmationDialog(DialogTypes.DELETE)
      .subscribe(isConfirmed => {
        if (isConfirmed) {
          this.dataProviderService.removeRecord(this.data.currentRow.id);
          this.closeDialog();
        }
      });
  }

  private createForm(values: TodoItem): FormGroup {
    return new FormGroup({
      name: new FormControl(values.name || '', [Validators.required]),
      description: new FormControl(values.description || '', [Validators.required])
    });
  }

  private closeDialog(data?: object): void {
    this.matDialogRef.close(data);
  }

}
