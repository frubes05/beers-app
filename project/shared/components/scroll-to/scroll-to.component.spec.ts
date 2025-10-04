import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollToComponent } from '@shared/components/scroll-to/scroll-to.component';

describe('ScrollTo', () => {
  let component: ScrollToComponent;
  let fixture: ComponentFixture<ScrollToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollToComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
