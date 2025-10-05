import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollToComponent } from '@shared/components/scroll-to/scroll-to.component';

describe('ScrollTo', () => {
  let component: ScrollToComponent;
  let fixture: ComponentFixture<ScrollToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollToComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to specific element on click', () => {
    spyOn(window, 'scrollTo');

    const element = document.createElement('div');
    Object.defineProperty(element, 'offsetTop', { value: 150 });
    component.elementToScrollTop = element;
    component.onClick();

    const args = (window.scrollTo as jasmine.Spy).calls.argsFor(0);
    expect(args).toEqual([{ top: element.offsetTop ?? 0, left: 0, behavior: 'smooth' }]);
  });
});
