import { Component, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';


@Component({
  selector: 'app-option-chooser',
  templateUrl: './option-chooser.component.html',
  styleUrls: ['./option-chooser.component.scss']
})
export class OptionChooserComponent {

  @Output() jsonIs: EventEmitter<string>;

  public hoverTab: Array<boolean>;
  public linkTab: Array<string>;

  constructor() {
    this.jsonIs = new EventEmitter();
    this.hoverTab = [false, false, false];
    this.linkTab = ['../../assets/testINT.json', '../../assets/testAudit.json', '../../assets/testEXT.json'];
  }

  public setJson(cellNumber: number) {
    this.jsonIs.emit(this.linkTab[cellNumber]);
  }

}
