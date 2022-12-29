import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentAreaComponent } from './comment-area.component';

describe('CommentAreaComponent', () => {
  let component: CommentAreaComponent;
  let fixture: ComponentFixture<CommentAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
