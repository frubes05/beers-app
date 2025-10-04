import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeerListComponent } from '@features/beers/components/beer-list/beer-list.component';
import { UrlService } from '@root/core/services/url-service/url.service';

describe('BeerList', () => {
  let component: BeerListComponent;
  let fixture: ComponentFixture<BeerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerListComponent],
      providers: [{ provide: UrlService, useValue: UrlService }, provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(BeerListComponent);
    component = fixture.componentInstance;
    component.loading = true;
    component.error = null;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
