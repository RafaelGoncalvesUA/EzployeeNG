import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfavoritesPageComponent } from './myfavorites-page.component';

describe('MyfavoritesPageComponent', () => {
  let component: MyfavoritesPageComponent;
  let fixture: ComponentFixture<MyfavoritesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyfavoritesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyfavoritesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
