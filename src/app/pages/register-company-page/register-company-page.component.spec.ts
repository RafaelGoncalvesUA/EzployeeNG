import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCompanyPageComponent } from './register-company-page.component';

describe('RegisterCompanyPageComponent', () => {
  let component: RegisterCompanyPageComponent;
  let fixture: ComponentFixture<RegisterCompanyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCompanyPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCompanyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
