import { CategoryService } from '../../_services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import * as _ from 'lodash';

@Component({
  selector: 'app-option-chooser',
  templateUrl: './option-chooser.component.html',
  styleUrls: ['./option-chooser.component.scss']
})
export class OptionChooserComponent implements OnInit, OnDestroy {

  private categorySub: Subscription;

  public hoverTab: Array<boolean>;
  public categoryTab: Array<any>;

  constructor(private router: Router, private categoryS: CategoryService) {
    this.hoverTab = [false, false, false];
  }

  ngOnInit() {
    this.categorySub = this.categoryS.getCategory().subscribe(res => {
      this.categoryTab = res['hydra:member'];
    });
  }

  ngOnDestroy() {
    this.categorySub.unsubscribe();
  }

  public setCat(id: number) {
    this.categoryS.setSelectedCat(id);
    this.router.navigate(['/text_creator']);
  }

}
