import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBar} from '@angular/material';


@Component({
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(
    private snackbar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  get getMessage() {
    return this.data.message;
  }

  get getIcon() {
    switch (this.data.alertType) {
      case 'Success':
        return 'done';
      case 'Error':
        return 'error';
      case 'Warning':
        return 'warning';
      case 'Info':
        return 'info';
      default:
        return undefined;
    }
  }

  ngOnInit() {
  }

  dismiss() {
    this.snackbar.dismiss();
  }

}
