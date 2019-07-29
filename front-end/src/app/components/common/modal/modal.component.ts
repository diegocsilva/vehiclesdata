import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'button-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() buttonName: string;
  @Input() titleButton: string;
  @Input() header: string;
}