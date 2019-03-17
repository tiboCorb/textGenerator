import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {MatSidenavContent} from '@angular/material'
import {MatSnackBar} from '@angular/material';
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

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.pageIsReady = false;
    this.goodItems = [];
    this.badItems = [];
    this.texts = [];
    this.isnotEditing = [];
  }

  ngOnInit() {
    this.getJSON().subscribe(res => {
      this.intTab(res.positive, res.negative);
      this.pageIsReady = true;
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get('../../assets/options.json');
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

  public endEdit(point: Point) {
    const index = _.findIndex(this.texts, el => el === point);
    this.isnotEditing[index] = true;
  }

  public copyMessage() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    this.texts.forEach(el => {
      selBox.value += el.text + '\n\n';
    });
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

}


