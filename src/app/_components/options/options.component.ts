import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { SpaceCheckBoxComponent } from '../space-check-box/space-check-box.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CategoryService } from '../../_services/category.service';
import { PostService } from '../../_services/post.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Post } from '../../model';

import * as _ from 'lodash';



@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit, OnDestroy {

  @ViewChildren(SpaceCheckBoxComponent) checkboxs: QueryList<SpaceCheckBoxComponent>;

  public goodItems: Array<Post>;
  public badItems: Array<Post>;
  public texts: Array<Post>;
  public pageIsReady: boolean;
  public badTab: Array<boolean>;
  public goodTab: Array<boolean>;
  public isnotEditing: Array<boolean>;
  public isnotEditingBorder: Array<boolean>;
  public end: Post;
  public start: Post;
  public nbCol: number;
  public catId: number;
  public isAddingGood: boolean;
  public isAddingbad: boolean;
  private subscription: Subscription;



  constructor(private http: HttpClient,
    private snackBar: MatSnackBar,
    private categoryS: CategoryService,
    private postS: PostService,
    private router: Router) {
    this.isAddingGood = false;
    this.isAddingbad = false;
    this.pageIsReady = false;
    this.goodItems = [];
    this.badItems = [];
    this.texts = [];
    this.isnotEditing = [];
    this.badTab = [];
    this.goodTab = [];
    this.isnotEditingBorder = [true, true];
  }

  ngOnInit() {
    this.subscription = this.categoryS.getSelectedCat().subscribe(id => {
      if (id !== null) {
        this.postS.getPostByCategory(id).subscribe(posts => {
          this.catId = id;
          this.initPage(posts['hydra:member']);
        });
        return;
      }
      this.router.navigate(['/chooser']);
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

    objArrayGood.forEach(el => {
      this.goodItems = [...this.goodItems, el];
      this.goodTab.push(false);
    });

    objArrayBad.forEach(el => {
      this.badItems = [...this.badItems, el];
      this.badTab.push(false);
    });
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.texts, event.previousIndex, event.currentIndex);
    moveItemInArray(this.isnotEditing, event.previousIndex, event.currentIndex);
  }

  public add(post: Post) {
    this.changeTextList(true, post);
    if (post.status === 'plus') {
      this.goodTab[this.goodItems.findIndex(el => el.id === post.id)] = true;
      this.goodTab = [... this.goodTab];
      return;
    }
    this.badTab[this.badItems.findIndex(el => el.id === post.id)] = true;
    this.badTab = [... this.badTab];
  }

  public remove(post: any) {
    this.changeTextList(false, post);
    if (post.status === 'plus') {
      this.goodTab[this.goodItems.findIndex(el => el.id === post.id)] = false;
      this.goodTab = [... this.goodTab];
      return;
    }
    this.badTab[this.badItems.findIndex(el => el.id === post.id)] = false;
    this.badTab = [... this.badTab];
  }

  public changeTextList(isAdding: boolean, point: Post) {
    if (isAdding) {
      this.texts = [...this.texts, point];
      this.isnotEditing = [... this.isnotEditing, true];
    } else {
      const index = _.findIndex(this.texts, el => el === point);
      _.remove(this.texts, el => el === point);
      this.isnotEditing.splice(index, 1);
    }
  }

  public edit(point: Post) {
    const index = _.findIndex(this.texts, el => el === point);
    this.isnotEditing[index] = false;
  }

  public editBorder(status: string) {
    this.isnotEditingBorder[status === 'end' ? 1 : 0] = false;
  }

  public endEdit(point: Post) {
    const index = _.findIndex(this.texts, el => el === point);
    this.postS.updatePostbyId(point).subscribe();
    this.isnotEditing[index] = true;
  }

  public endEditBorder(status: string) {
    this.isnotEditingBorder[status === 'end' ? 1 : 0] = true;
  }

  public copyMessage() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    if (this.start) {
      selBox.value += this.start.description + '\n\n';
    }
    this.texts.forEach(el => {
      el.textLink ? selBox.value += el.textLink + ' ' : selBox.value += '';
      selBox.value += el.description + '\n\n';
    });
    if (this.end) {
      selBox.value += this.end.description + '\n\n';
    }

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
    this.isAddingbad = false;
  }

  public addBad() {
    this.isAddingbad = true;
    this.isAddingGood = false;
  }

  public submitAddPoint(newPost: Post) {
    if (newPost) {
      if (newPost.status === 'plus') {
        this.goodItems = [... this.goodItems, newPost];
        this.isAddingGood = false;
        this.isAddingbad = false;
        return;
      }
      this.badItems = [... this.badItems, newPost];
    }
    this.isAddingGood = false;
    this.isAddingbad = false;
  }

  public swap() {
    this.pageIsReady = false;
  }

  public initPage(posts: Array<Post>) {
    if (posts === undefined) {
      this.router.navigate(['chooser']);
    }
    this.resetPage();

    const startIndex = posts.findIndex(el => el.status === 'start');
    const endIndex = posts.findIndex(el => el.status === 'end');
    if (startIndex !== -1) {
      this.start = posts[startIndex];
    }

    if (endIndex !== -1) {
      this.end = posts[endIndex];
    }

    this.intTab(posts.filter(el => el.status === 'plus'), posts.filter(el => el.status === 'moins'));
    const nbColGood = Math.floor(this.goodItems.length / 5) + 1;
    const nbColBad = Math.floor(this.badItems.length / 5) + 1;
    this.nbCol = (nbColGood >= nbColBad) ? nbColGood : nbColBad;
    this.pageIsReady = true;
  }
}


