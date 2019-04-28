import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';



const firstGood = ['Dans un premier temps, '];
const lastGood = ['Pour finir sur une note positive, '];
const firstBad = ['Nous commençons par vous alertez sûr '];
const lastBad = ['Enfin '];
const goodAfterBad = ['Malgrès tout '];
const goodAfterGood = ['Nous avons également noté que '];
const badAfterGood = ['Néenmoins '];
const badAfterBad = ['Deplus '];

@Component({
  selector: 'app-text-link',
  templateUrl: './text-link.component.html',
  styleUrls: ['./text-link.component.scss']
})


export class TextLinkComponent implements OnInit, OnChanges {

  @Input() previousIs: string;
  @Input() position: { index: number, length: number };
  @Input() is: string;
  @Output() value: EventEmitter<string>;

  public selectList: Array<string>;

  constructor() {
    this.value = new EventEmitter();
  }

  ngOnInit() {
    this.initSelectList();
  }

  ngOnChanges() {
    this.initSelectList();
  }

  public changeSelection(event: any) {
    this.value.emit(event.value);
  }

  private initSelectList() {
    if (this.position.index === 0) {
      this.is ? this.selectList = firstGood : this.selectList = firstBad;
      return;
    }
    if (this.position.index === this.position.length - 1) {
      this.is ? this.selectList = lastGood : this.selectList = lastBad;
      return;
    }
    if (this.is) {
      this.previousIs ? this.selectList = goodAfterGood : this.selectList = goodAfterBad;
      return;
    }
    this.previousIs ? this.selectList = badAfterGood : this.selectList = badAfterBad;
  }

}
