import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtlGuideComponent } from './rtl-guide.component';

describe('RtlGuideComponent', () => {
  let component: RtlGuideComponent;
  let fixture: ComponentFixture<RtlGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtlGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtlGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
