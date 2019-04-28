import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class JsonService {
    private jsonSelected: BehaviorSubject<string>;

    constructor() {
        this.jsonSelected = new BehaviorSubject('');
    }

    public getJSON() {
        return this.jsonSelected.asObservable();
    }

    public setJSON(selectedJSON: string): void {
        this.jsonSelected.next(selectedJSON);
    }

}
