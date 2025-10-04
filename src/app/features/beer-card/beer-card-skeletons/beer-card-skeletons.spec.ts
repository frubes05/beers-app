import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerCardSkeletons } from './beer-card-skeletons';

describe('BeerCardSkeletons', () => {
  let component: BeerCardSkeletons;
  let fixture: ComponentFixture<BeerCardSkeletons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerCardSkeletons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerCardSkeletons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
