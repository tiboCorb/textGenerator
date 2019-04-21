import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionChooserComponent } from './option-chooser.component';

describe('OptionChooserComponent', () => {
  let component: OptionChooserComponent;
  let fixture: ComponentFixture<OptionChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
