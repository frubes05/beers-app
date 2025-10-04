import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scroll-to',
  imports: [],
  templateUrl: './scroll-to.html',
  styleUrl: './scroll-to.scss',
})
export class ScrollTo {
  @Input() elementToScrollTop?: HTMLElement;

  onClick(): void {
    const element = this.elementToScrollTop?.offsetTop;
    window.scrollTo({ top: element ?? 0, left: 0, behavior: 'smooth' });
  }
}
