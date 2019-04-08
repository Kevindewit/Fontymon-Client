import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {AlertComponent} from '../alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private snackbar: MatSnackBar) {
  }

  public openAlert(message: string, action: string, alertType?: string) {
    let panelClass;

    switch (alertType) {
      case 'Success':
        panelClass = 'success-snackbar';
        break;
      case 'Error':
        panelClass = 'error-snackbar';
        break;
      case 'Warning':
        panelClass = 'warning-snackbar';
        break;
      case 'Info':
        panelClass = 'info-snackbar';
        break;
      default:
        panelClass = 'snackbar';
        break;
    }

    this.snackbar.openFromComponent(AlertComponent, {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: panelClass,
      data: {message: message, alertType: alertType},
    });
  }

}
