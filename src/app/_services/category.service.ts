import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {

    private selectedcat: BehaviorSubject<number>;

    constructor(private http: HttpClient) {
        this.selectedcat = new BehaviorSubject(null);
    }

    public getCategory(): Observable<any> {
        return this.http.get(environment.api + '/categories');
    }

    public getCategorybyId(id: number): Observable<any> {
        return this.http.get(environment.api + `/categories/${id}`);
    }

    public getSelectedCat(): Observable<number> {
        return this.selectedcat.asObservable();
    }

    public setSelectedCat(id: number): void {
        this.selectedcat.next(id);
    }

}
