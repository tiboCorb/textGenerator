import { Inject, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-comfirm-dialog',
  templateUrl: './comfirm-dialog.component.html',
  styleUrls: ['./comfirm-dialog.component.scss']
})
export class ComfirmDialogComponent {

  constructor(private dialogRef: MatDialogRef<ComfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) data) { }

  public close(isComfirmed: boolean): void {

    this.dialogRef.close(isComfirmed);
  }
}
