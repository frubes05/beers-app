import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from '@shared/components/modal/modal.component';

describe('Modal', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal if the click happened outside of dialog element', () => {
    const component = fixture.componentInstance;
    spyOn(component.closed, 'emit');

    const outsideElement = document.createElement('div');
    const event = new Event('click');
    Object.defineProperty(event, 'target', { value: outsideElement });

    component.onClick(event);

    expect(component.closed.emit).toHaveBeenCalledWith(outsideElement);
  });

  it('should not close modal if the click happened inside dialog element', () => {
    const component = fixture.componentInstance;
    spyOn(component.closed, 'emit');

    const dialog = fixture.componentInstance.dialogContentRef.nativeElement;
    dialog.dispatchEvent(new Event('click'));

    expect(component.closed.emit).not.toHaveBeenCalledWith(dialog);
  });
});
