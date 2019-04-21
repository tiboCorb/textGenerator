import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as _ from 'lodash';

@Component({
  selector: 'app-point-form',
  templateUrl: './point-form.component.html',
  styleUrls: ['./point-form.component.scss']
})
export class PointFormComponent implements OnInit {

  @Input() isGood: boolean;
  @Output() submitForm: EventEmitter<any>;
  public form: FormGroup;


  constructor(private fb: FormBuilder) {
    this.submitForm = new EventEmitter();
    this.form = this.fb.group({
      name: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public submitAdd() {
    this.submitForm.emit(_.assign(this.form.getRawValue(), { isgood: this.isGood }));
  }
  public cancelAdd() {
    this.submitForm.emit();
  }

}
