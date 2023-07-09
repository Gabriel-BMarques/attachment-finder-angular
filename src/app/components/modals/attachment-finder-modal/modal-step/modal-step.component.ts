import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-step',
  templateUrl: './modal-step.component.html',
  styleUrls: ['./modal-step.component.scss']
})
export class ModalStepComponent {
  @Input() stepTitle!: string;
  @Input() stepQuestion!: string | null;
  @Input() stepId!: string;
  @Input() dataUrl!: string;

  constructor() {}
}
