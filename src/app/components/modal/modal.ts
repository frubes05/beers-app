import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  providers: [],
})
export class Modal<T> {
  @ViewChild('dialogContent', { static: true }) dialogContentRef!: ElementRef<HTMLElement>;
  @Output() closed = new EventEmitter<HTMLElement>();

  close(element: HTMLElement) {
    this.closed.emit(element);
  }

  onClick(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (!this.dialogContentRef.nativeElement.contains(targetElement)) {
      this.closed.emit(event.target as HTMLElement);
    }
  }
}
