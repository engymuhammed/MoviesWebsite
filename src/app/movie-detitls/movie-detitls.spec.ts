import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetitls } from './movie-detitls';

describe('MovieDetitls', () => {
  let component: MovieDetitls;
  let fixture: ComponentFixture<MovieDetitls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetitls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetitls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
