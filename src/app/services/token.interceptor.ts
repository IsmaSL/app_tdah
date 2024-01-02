import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { SwalService } from './swal.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, 
                private router: Router,
                private swalServ: SwalService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
    
        const token = this.authService.getToken();
        if (token) {
            authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        
        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) {
                    this.swalServ.swalSessionExpired();
                    // Si el token ha expirado o no es válido
                    this.authService.logout(); // Limpia la sesión
                    this.router.navigate(['/login'], { replaceUrl: true }); // Redirige al login
                }
                return throwError(error);
            })
        );
    }
}