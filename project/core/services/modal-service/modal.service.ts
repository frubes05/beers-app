import {
  ComponentRef,
  createEnvironmentInjector,
  EnvironmentInjector,
  inject,
  Injectable,
  Injector,
  OnDestroy,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

@Injectable({ providedIn: 'root' })
export class ModalService implements OnDestroy {
  private readonly injector = inject(Injector);
  private modalRef!: ComponentRef<ModalComponent>;

  ngOnDestroy(): void {
    clearAllBodyScrollLocks();
  }

  openModal({
    data,
    viewContainerRef,
    modal,
  }: {
    data: object;
    viewContainerRef: ViewContainerRef;
    modal: Type<ModalComponent>;
  }) {
    this.modalRef = viewContainerRef.createComponent(modal, {
      environmentInjector: createEnvironmentInjector(
        [
          {
            provide: 'CONTEXT',
            useValue: data,
          },
          {
            provide: 'CLOSE_MODAL',
            useFactory: () => (el: HTMLElement | null) => this.closeModal(el),
          },
        ],
        this.injector as EnvironmentInjector
      ),
    });

    const dialog = this.modalRef?.location.nativeElement.querySelector('dialog');

    if (dialog) {
      dialog.showModal();
      disableBodyScroll(dialog);
    }
  }

  closeModal(targetElement: HTMLElement | null) {
    const dialogEl = this.modalRef?.location.nativeElement.querySelector(
      'dialog'
    ) as HTMLDialogElement;
    if (dialogEl && !dialogEl.contains(targetElement)) {
      dialogEl.close?.();
    }

    enableBodyScroll(dialogEl);
    this.modalRef?.destroy();
  }
}
