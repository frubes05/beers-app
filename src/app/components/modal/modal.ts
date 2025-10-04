import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  providers: [],
})
export class Modal<T> {
  @ViewChild('dialog', { static: true }) dialogRef!: ElementRef<HTMLDialogElement>;
  @Output() closed = new EventEmitter<HTMLElement>();

  close(element: HTMLElement) {
    this.closed.emit(element);
  }

  onClick(event: Event) {
    this.closed.emit(event.target as HTMLElement);
  }
}
