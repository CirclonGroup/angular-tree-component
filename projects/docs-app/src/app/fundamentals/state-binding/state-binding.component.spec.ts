import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateBindingComponent } from './state-binding.component';

describe('StateBindingComponent', () => {
  let component: StateBindingComponent;
  let fixture: ComponentFixture<StateBindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateBindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
