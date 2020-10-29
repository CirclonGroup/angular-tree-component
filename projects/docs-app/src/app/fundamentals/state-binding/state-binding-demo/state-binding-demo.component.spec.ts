import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateBindingDemoComponent } from './state-binding-demo.component';

describe('StateBindingDemoComponent', () => {
  let component: StateBindingDemoComponent;
  let fixture: ComponentFixture<StateBindingDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateBindingDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateBindingDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
