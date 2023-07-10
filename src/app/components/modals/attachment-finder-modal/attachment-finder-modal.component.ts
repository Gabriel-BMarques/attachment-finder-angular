import { Component, Input, OnInit } from '@angular/core';
import { MachineType } from 'src/app/_typings/machine-type';
import { attachmentFinderSteps } from 'src/app/constants/attachment-finder/attachmet-finder-steps';
import { AttachmentFinderService } from 'src/app/services/wizards/attachment-finder.service';

@Component({
  selector: 'app-attachment-finder-modal',
  templateUrl: './attachment-finder-modal.component.html',
  styleUrls: ['./attachment-finder-modal.component.scss']
})
export class AttachmentFinderModalComponent {
  steps = this.attachmentFinderService.steps;

  get currentStep(): number {
    return this.attachmentFinderService.currentStep;
  }

  get selectedMachine(): MachineType | undefined {
    return this.attachmentFinderService.wizardData.machineType;
  }

  constructor(
    private attachmentFinderService: AttachmentFinderService
  ) {}

  getModalTitleData(index: number): any[] {
    const { id } = this.steps[index];

    if (id === 'result') return [index + 1, this.attachmentFinderService.attachment?.name]
    return [index + 1];
  }

  previousStep() {
    this.attachmentFinderService.previousStep();
  }

  nextStep() {
    this.attachmentFinderService.nextStep();
  }
}