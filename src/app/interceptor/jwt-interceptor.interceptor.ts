import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import {HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = this.cookieService.get('TOKEN');
    const correo: any = localStorage.getItem('email');

    let req = request;

    if(token){
      localStorage.setItem('email', correo);
      req = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' +token
        }
      });
    }

    return next.handle(req);
  }
}
