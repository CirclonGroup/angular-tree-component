import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesDemoComponent } from './templates-demo.component';

describe('TemplatesDemoComponent', () => {
  let component: TemplatesDemoComponent;
  let fixture: ComponentFixture<TemplatesDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatesDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatesDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
