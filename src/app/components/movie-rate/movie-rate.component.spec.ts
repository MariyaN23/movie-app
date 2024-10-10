import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRateComponent } from './movie-rate.component';

describe('MovieRateComponent', () => {
  let component: MovieRateComponent;
  let fixture: ComponentFixture<MovieRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieRateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
