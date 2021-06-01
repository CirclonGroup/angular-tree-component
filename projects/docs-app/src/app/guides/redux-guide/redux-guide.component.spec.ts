import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduxGuideComponent } from './redux-guide.component';

describe('ReduxGuideComponent', () => {
  let component: ReduxGuideComponent;
  let fixture: ComponentFixture<ReduxGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReduxGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduxGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
