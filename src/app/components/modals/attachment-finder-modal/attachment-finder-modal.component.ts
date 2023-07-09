import { Component, Input, OnInit } from '@angular/core';
import { attachmentFinderSteps } from 'src/app/constants/attachment-finder/attachmet-finder-steps';

@Component({
  selector: 'app-attachment-finder-modal',
  templateUrl: './attachment-finder-modal.component.html',
  styleUrls: ['./attachment-finder-modal.component.scss']
})
export class AttachmentFinderModalComponent {
  currentStep = 1;
  steps = attachmentFinderSteps;

  getModalTitleData(index: number): any[] {
    const { id } = this.steps[index];

    if (id === 'result') return [index + 1, 'undefined machinery']
    return [index + 1];
  }

  previousStep() {
    console.log(this.currentStep, this.steps.length);
    if (this.currentStep >= this.steps.length) {
      this.currentStep -= 1;
    }
  }

  nextStep() {
    console.log(this.currentStep, this.steps.length);
    if (this.currentStep < this.steps.length) {
      this.currentStep += 1;
    }
  }
}
