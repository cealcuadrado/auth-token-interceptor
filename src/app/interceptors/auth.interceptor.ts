import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.authService.getAuthToken();
    let updatedRequest: HttpRequest<unknown>;

    if (token) {
      updatedRequest = this.updateRequest(request, token);
    }

    return next.handle(updatedRequest).pipe(
      catchError((error: HttpErrorResponse): Observable<any> => {
        let errorMsg = '';
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            console.error(error.message);
            errorMsg = `Error code: ${error.status}, Message: ${error.message}`;
            // Aquí se podría redirigir al usuario a la página de logout, por ejemplo
          } else {
            errorMsg = `Error: ${error.message}`;
          }
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  updateRequest(request: HttpRequest<unknown>, token: string) {
    return request.clone({
      setHeaders: {
        Authentication: `Token: ${token}`
      }
    });
  }


}
