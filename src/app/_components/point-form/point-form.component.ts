import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../_services/post.service';
import { Post } from '../../model';

import * as _ from 'lodash';

@Component({
  selector: 'app-point-form',
  templateUrl: './point-form.component.html',
  styleUrls: ['./point-form.component.scss']
})
export class PointFormComponent implements OnInit {

  @Input() isGood: boolean;
  @Input() catId: number;
  @Output() submitForm: EventEmitter<Post>;
  public form: FormGroup;


  constructor(private fb: FormBuilder, private postS: PostService) {
    this.submitForm = new EventEmitter();
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public submitAdd() {
    const post = _.assign(this.form.getRawValue(), {
      status: this.isGood ? 'plus' : 'moins',
      draft: true, categoryId: `/api/categories/${this.catId}`, postedBy: '/api/users/1'
    });
    this.postS.creatPost(post).subscribe(res => this.submitForm.emit(res));

  }
  public cancelAdd() {
    this.submitForm.emit();
  }

}
