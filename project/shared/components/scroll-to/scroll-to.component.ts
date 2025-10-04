import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-scroll-to',
  imports: [],
  templateUrl: './scroll-to.component.html',
  styleUrl: './scroll-to.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToComponent {
  @Input() elementToScrollTop?: HTMLElement;

  onClick(): void {
    const element = this.elementToScrollTop?.offsetTop;
    window.scrollTo({ top: element ?? 0, left: 0, behavior: 'smooth' });
  }
}
