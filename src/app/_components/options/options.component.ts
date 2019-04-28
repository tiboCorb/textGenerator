import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material';
import { JsonService } from '../../_services/json.service';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Point } from '../../model';

import * as _ from 'lodash';



@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit, OnDestroy {

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
  private subscription: Subscription;



  constructor(private http: HttpClient, private snackBar: MatSnackBar, private jsonS: JsonService, private router: Router) {
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
    this.subscription = this.jsonS.getJSON().subscribe(url => {
      this.initPage(url);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public textLinkValueChange(value: string, index: number) {
    this.texts[index].textLink = value;
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
      el.textLink ? selBox.value += el.textLink + ' ' : selBox.value += '';
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

  public initPage(url: string) {
    if (url === '') {
      this.router.navigate(['json_chooser']);
    }
    this.resetPage();
    this.getJSON(url).subscribe(res => {
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


