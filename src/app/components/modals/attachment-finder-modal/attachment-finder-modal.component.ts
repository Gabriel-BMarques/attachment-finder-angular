import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MachineType } from 'src/app/_typings/machine-type';
import { AttachmentFinderService } from 'src/app/services/wizards/attachment-finder.service';

@Component({
  selector: 'app-attachment-finder-modal',
  templateUrl: './attachment-finder-modal.component.html',
  styleUrls: ['./attachment-finder-modal.component.scss']
})
export class AttachmentFinderModalComponent {
  @Output() closeModalEvent = new EventEmitter();

  steps = this.attachmentFinderService.steps;

  get currentStep(): number {
    return this.attachmentFinderService.currentStep;
  }

  get selectedMachine(): MachineType | undefined {
    return this.attachmentFinderService.wizardData.machineType;
  }

  get hasSelection(): boolean {
    const { machineType, weightCategory, hydraulicFlow, materialLength } = this.attachmentFinderService.wizardData;
    switch (this.currentStep) {
      case 1:
        return !!machineType;
      case 2:
        return !!weightCategory;
      case 3:
        return !!hydraulicFlow;
      case 4:
        return !!materialLength;
      default:
        return true;
    }
  }

  constructor(
    private attachmentFinderService: AttachmentFinderService
  ) {}

  closeModal() {
    this.closeModalEvent.emit();
  }

  previousStep() {
    this.attachmentFinderService.previousStep();
  }

  nextStep() {
    this.attachmentFinderService.nextStep();
  }
}
