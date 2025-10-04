import { provideZonelessChangeDetection, Signal, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from '@root/core/services/url-service/url.service';

import { PaginationComponent } from '@shared/components/pagination/pagination.component';

describe('Pagination', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRoute },
        { provide: UrlService, useValue: UrlService },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.page = signal(1) as unknown as Signal<number>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
