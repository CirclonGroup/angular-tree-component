import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsDemoComponent } from './actions-demo.component';

describe('ActionsDemoComponent', () => {
  let component: ActionsDemoComponent;
  let fixture: ComponentFixture<ActionsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
