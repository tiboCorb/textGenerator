import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../_services/category.service';
import { JsonService } from '../../_services/json.service';

import * as _ from 'lodash';


@Component({
  selector: 'app-option-chooser',
  templateUrl: './option-chooser.component.html',
  styleUrls: ['./option-chooser.component.scss']
})
export class OptionChooserComponent implements OnInit {

  public hoverTab: Array<boolean>;
  public linkTab: Array<string>;

  constructor(private jsonS: JsonService, private router: Router, private categoryS: CategoryService) {
    this.hoverTab = [false, false, false];
    this.linkTab = ['../../assets/testINT.json', '../../assets/testAudit.json', '../../assets/testEXT.json'];
  }

  ngOnInit() {
    this.categoryS.getCategory().subscribe(res => console.log(res));
  }
  public setJson(cellNumber: number) {
    this.jsonS.setJSON(this.linkTab[cellNumber]);
    this.router.navigate(['/text_creator']);
  }

}
