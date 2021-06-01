import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsExampleComponent } from './columns-example.component';

describe('ColumnsExampleComponent', () => {
  let component: ColumnsExampleComponent;
  let fixture: ComponentFixture<ColumnsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnsExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
