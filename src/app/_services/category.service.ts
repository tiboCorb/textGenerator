import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {

    constructor(private http: HttpClient) {
    }


    public getCategory(): Observable<any> {
        return this.http.get(environment.api + '/categories');
    }


}
