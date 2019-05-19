import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceCheckBoxComponent } from './space-check-box.component';

describe('SpaceCheckBoxComponent', () => {
  let component: SpaceCheckBoxComponent;
  let fixture: ComponentFixture<SpaceCheckBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceCheckBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
