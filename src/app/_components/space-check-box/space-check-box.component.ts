import { Component, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';
import { Post } from '../../model';

@Component({
  selector: 'app-space-check-box',
  templateUrl: './space-check-box.component.html',
  styleUrls: ['./space-check-box.component.scss']
})
export class SpaceCheckBoxComponent implements OnInit, OnChanges {

  @Input() post: Post;
  @Input() checked : boolean;
  @Output() addPost: EventEmitter<any>;
  @Output() removePost: EventEmitter<any>;

  public id: number;
 

  constructor() {
    this.addPost = new EventEmitter();
    this.removePost = new EventEmitter();
    this.checked = false;
  }

  ngOnInit() {
    if (this.post && this.post.id) {
      this.id = this.post.id;
    }
  }

  ngOnChanges() {
    if (this.post && this.post.id) {
      this.id = this.post.id;
    }
  }

  public changeState() {

    this.checked = !this.checked;
  }

  public changeTextList(event: any) {
    if (event.checked) {
      this.addPost.emit(this.post);
      return;
    }
    this.removePost.emit(this.post);
  }

}
