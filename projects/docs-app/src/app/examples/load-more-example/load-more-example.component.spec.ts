import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMoreExampleComponent } from './load-more-example.component';

describe('LoadMoreExampleComponent', () => {
  let component: LoadMoreExampleComponent;
  let fixture: ComponentFixture<LoadMoreExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadMoreExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMoreExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
