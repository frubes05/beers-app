import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeersPage } from './beers.page';

describe('Beers', () => {
  let component: BeersPage;
  let fixture: ComponentFixture<BeersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeersPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BeersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
