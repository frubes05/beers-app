import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
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
