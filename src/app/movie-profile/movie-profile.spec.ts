import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieProfile } from './movie-profile';

describe('MovieProfile', () => {
  let component: MovieProfile;
  let fixture: ComponentFixture<MovieProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
