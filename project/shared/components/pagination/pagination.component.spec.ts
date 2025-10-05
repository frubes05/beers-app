import { provideZonelessChangeDetection, signal } from '@angular/core';
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
    component.page = signal(2);
    component.showPagination = true;
    component.showBackButton = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call next page to show on click', () => {
    spyOn(component.nextPage, 'emit');

    const buttons = fixture.nativeElement.querySelectorAll('button');
    const nextButton = buttons[1];

    nextButton.click(component.page());

    expect(component.nextPage.emit).toHaveBeenCalledWith(component.page() + 1);
  });

  it('should call previous page to show on click', () => {
    spyOn(component.previousPage, 'emit');

    const buttons = fixture.nativeElement.querySelectorAll('button');
    const previousButton = buttons[0];

    previousButton.click(component.page());

    expect(component.previousPage.emit).toHaveBeenCalledWith(component.page() - 1);
  });
});
