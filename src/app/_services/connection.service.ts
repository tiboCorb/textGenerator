import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ConnectionService {

    private token: BehaviorSubject<string>;

    constructor(private http: HttpClient) {
        this.token = new BehaviorSubject('');

    }

    public setToken(token: string): void {
        this.token.next(token);
    }

    public getToken(): Observable<string> {
        return this.token.asObservable();
    }

    public askToken(user: string, pwd: string): Observable<any> {
        return this.http.post(environment.api + '/login_check', { username: user, password: pwd });
    }


}
