import { ComponentRef, provideZonelessChangeDetection, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ModalService } from '@core/services/modal-service/modal.service';
import { ModalComponent } from '@shared/components/modal/modal.component';

describe('ModalService', () => {
  let modalService: ModalService;
  let mockViewContainerRef: jasmine.SpyObj<ViewContainerRef>;
  let mockComponentRef: jasmine.SpyObj<ComponentRef<ModalComponent>>;
  let mockDialog: HTMLDialogElement;

  beforeEach(() => {
    mockDialog = document.createElement('dialog');
    spyOn(mockDialog, 'showModal');
    spyOn(mockDialog, 'close');

    mockComponentRef = {
      location: {
        nativeElement: {
          querySelector: jasmine.createSpy('querySelector').and.returnValue(mockDialog),
        },
      },
      destroy: jasmine.createSpy('destroy'),
    } as any;

    mockViewContainerRef = jasmine.createSpyObj('ViewContainerRef', ['createComponent']);
    mockViewContainerRef.createComponent.and.returnValue(mockComponentRef);

    TestBed.configureTestingModule({
      providers: [ModalService, provideZonelessChangeDetection()],
    });

    modalService = TestBed.inject(ModalService);
  });

  it('should create', () => {
    expect(modalService).toBeTruthy();
  });

  it('should open modal and call showModal', () => {
    modalService.openModal({
      data: { beer: 'IPA' },
      viewContainerRef: mockViewContainerRef,
      modal: ModalComponent,
    });

    expect(mockViewContainerRef.createComponent).toHaveBeenCalled();
    expect(mockDialog.showModal).toHaveBeenCalled();
  });

  it('should close modal and destroy component', () => {
    modalService.openModal({
      data: { beer: 'IPA' },
      viewContainerRef: mockViewContainerRef,
      modal: ModalComponent,
    });

    const target = document.createElement('div');
    modalService.closeModal(target);

    expect(mockDialog.close).toHaveBeenCalled();
    expect(mockComponentRef.destroy).toHaveBeenCalled();
  });
});
