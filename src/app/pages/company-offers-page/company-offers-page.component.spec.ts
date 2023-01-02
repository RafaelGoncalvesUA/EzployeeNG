import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOffersPageComponent } from './company-offers-page.component';

describe('CompanyOffersPageComponent', () => {
  let component: CompanyOffersPageComponent;
  let fixture: ComponentFixture<CompanyOffersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyOffersPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyOffersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
