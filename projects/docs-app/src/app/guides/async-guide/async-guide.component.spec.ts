import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncGuideComponent } from './async-guide.component';

describe('AsyncGuideComponent', () => {
  let component: AsyncGuideComponent;
  let fixture: ComponentFixture<AsyncGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsyncGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
