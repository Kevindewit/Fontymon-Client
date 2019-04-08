import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AlertService} from '../_service/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private alertService: AlertService
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.alertService.openAlert('ERR_CONNECTION_REFUSED', undefined, 'Error');
        } else {
          this.alertService.openAlert(error.error, undefined, 'Error');
        }
        return throwError(error);
      }));
  }
}
