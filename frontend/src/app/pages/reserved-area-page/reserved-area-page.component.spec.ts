import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedAreaPageComponent } from './reserved-area-page.component';

describe('ReservedAreaPageComponent', () => {
  let component: ReservedAreaPageComponent;
  let fixture: ComponentFixture<ReservedAreaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservedAreaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservedAreaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
