import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Point } from '../../model';

import * as _ from 'lodash';



@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  @Input() title: string;

  public goodItems: Array<Point>;
  public badItems: Array<Point>;
  public texts: Array<Point>;
  public pageIsReady: boolean;
  public isnotEditing: Array<boolean>;
  public isnotEditingBorder: Array<boolean>;
  public end: Point;
  public start: Point;
  public nbCol: number;
  public isAddingGood: boolean;
  public isAddingbad: boolean;



  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.isAddingGood = false;
    this.isAddingbad = false;
    this.pageIsReady = false;
    this.goodItems = [];
    this.badItems = [];
    this.texts = [];
    this.isnotEditing = [];
    this.isnotEditingBorder = [true, true];
  }

  ngOnInit() {

  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  private resetPage() {
    this.isAddingGood = false;
    this.isAddingbad = false;
    this.pageIsReady = false;
    this.goodItems = [];
    this.badItems = [];
    this.texts = [];
    this.isnotEditing = [];
    this.isnotEditingBorder = [true, true];
  }

  intTab(objArrayGood: Array<any>, objArrayBad: Array<any>) {

    let tempKey: string;
    objArrayGood.forEach(el => {
      tempKey = _.keys(el);
      this.goodItems = [...this.goodItems, { name: tempKey[0], id: + el[`${tempKey}`].id, text: '' + el[`${tempKey}`].text, isgood: true }];
    });

    objArrayBad.forEach(el => {
      tempKey = _.keys(el);
      this.badItems = [...this.badItems, { name: tempKey[0], id: + el[`${tempKey}`].id, text: '' + el[`${tempKey}`].text, isgood: false }];
    });
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.texts, event.previousIndex, event.currentIndex);
    moveItemInArray(this.isnotEditing, event.previousIndex, event.currentIndex);
  }

  public changeTextList(event: any, point: Point) {
    if (event.checked) {
      this.texts = [...this.texts, point];
      this.isnotEditing = [... this.isnotEditing, true];
    } else {
      const index = _.findIndex(this.texts, el => el === point);
      _.remove(this.texts, el => el === point);
      this.isnotEditing.splice(index, 1);
    }
  }

  public edit(point: Point) {
    const index = _.findIndex(this.texts, el => el === point);
    this.isnotEditing[index] = false;
  }

  public editBorder(name: string) {
    this.isnotEditingBorder[name === 'end' ? 1 : 0] = false;
  }

  public endEdit(point: Point, event: any) {
    const index = _.findIndex(this.texts, el => el === point);
    this.isnotEditing[index] = true;
  }

  public endEditBorder(name: string) {
    this.isnotEditingBorder[name === 'end' ? 1 : 0] = true;
  }

  public copyMessage() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value += this.start.text + '\n\n';
    this.texts.forEach(el => {
      selBox.value += el.text + '\n\n';
    });
    selBox.value += this.end.text + '\n\n';
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.showMessage('Copier dans le presse papier');
  }


  public showMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  public addgood() {
    this.isAddingGood = true;
  }

  public addBad() {
    this.isAddingbad = true;
  }

  public submitAddPoint(event: any) {
    if (event) {

      return;
    }
    this.isAddingGood = false;
    this.isAddingbad = false;
  }

  public swap() {
    this.pageIsReady = false;
  }

  public setJson(event: any) {
    this.resetPage();
    this.getJSON(event).subscribe(res => {
      this.start = { name: 'start', id: null, text: res.start.text, isgood: false };
      this.end = { name: 'end', id: null, text: res.end.text, isgood: false };
      this.intTab(res.positive, res.negative);
      const nbColGood = Math.floor(res.positive.length / 5) + 1;
      const nbColBad = Math.floor(res.negative.length / 5) + 1;
      this.nbCol = (nbColGood >= nbColBad) ? nbColGood : nbColBad;
      this.pageIsReady = true;
    });
  }
}


