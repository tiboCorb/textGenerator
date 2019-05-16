import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { ConnectionService } from './connection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    private token: string;

    constructor(private connectionS: ConnectionService) {
        this.connectionS.getToken().subscribe(res => this.token = res);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        if (this.token && this.token !== '') {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + this.token) });
        }


        return next.handle(request);
    }
}
