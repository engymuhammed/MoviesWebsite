import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Favourite } from './favourite';

describe('Favourite', () => {
  let component: Favourite;
  let fixture: ComponentFixture<Favourite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Favourite]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Favourite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
