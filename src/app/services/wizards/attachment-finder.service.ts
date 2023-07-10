import { Injectable } from '@angular/core';
import { AttachmentType } from 'src/app/_typings/attachment-type';
import { HydraulicFlow } from 'src/app/_typings/hydraulic-flow';
import { MachineType } from 'src/app/_typings/machine-type';
import { MaterialLength } from 'src/app/_typings/material-length';
import { WeightCategory } from 'src/app/_typings/weight-category';
import { DataService } from '../api/data.service';
import { Attachment } from 'src/app/_typings/attachment';
import { AttachmentModel } from 'src/app/_typings/attachment-model';
import * as _ from 'lodash';
import { attachmentFinderSteps } from 'src/app/constants/attachment-finder/attachmet-finder-steps';
import { AttachmentFinderStep } from 'src/app/_typings/attachment-finder-step';

interface AttachmentFinderWizard {
  machineType?: MachineType,
  weightCategory?: WeightCategory,
  hydraulicFlow?: HydraulicFlow,
  materialLength?: MaterialLength
}

@Injectable({
  providedIn: 'root'
})
export class AttachmentFinderService {
  private wizard: AttachmentFinderWizard = {}
  private _attachment!: Attachment;
  private _currentStep: number = 1;
  private _steps = attachmentFinderSteps;

  get wizardData(): AttachmentFinderWizard {
    return this.wizard;
  }

  get attachment(): Attachment {
    return this._attachment
  }

  get currentStep(): number {
    return this._currentStep;
  }

  get steps(): AttachmentFinderStep[] {
    return this._steps;
  }

  set attachment(attachment: Attachment) {
    this._attachment = attachment
  }

  set currentStep(step: number) {
    this._currentStep = step;
  }

  constructor(
    private dataService: DataService
  ) {}

  resetWizard() {
    this.wizard = {};
    this.currentStep = 1;
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
    }
  }

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.currentStep += 1;
    }
  }

  save(step: string, data: any) {
    switch(step) {
      case 'machineType':
        this.wizard.machineType = data;
        break;
      case 'weigthCategory':
        this.wizard.weightCategory = data;
        break;
      case 'hydraulicFlow':
        this.wizard.hydraulicFlow = data;
        break;
      case 'materialLength':
        this.wizard.materialLength = data;
        break;
    }
  }

  orderItemsByPrice(items: AttachmentModel[]) {
    if (items.length <= 1) {
      return items;
    }

    const lowestPriceAttachment: AttachmentModel | any = _.minBy(items, 'price');
    const lowestIndex = items.indexOf(lowestPriceAttachment);
    items.splice(lowestIndex, 1);

    const middleIndex = Math.floor(items.length / 2);
    items.splice(middleIndex, 0, lowestPriceAttachment);

    items.forEach((item) => {
      if (lowestPriceAttachment.id !== item.id) item.recommended = false;
      else item.recommended = true;
    });

    return items;
  }

  getMatchingItems(attachmentModels: AttachmentModel[], attachmentsTypes: AttachmentType[]): AttachmentModel[] | null {
    const matchingItems = attachmentModels.filter((am) => {
      const {
        machineType,
        weightCategory,
        hydraulicFlow,
        materialLength
      } = this.wizard;

      return am.machineTypesIds.includes(machineType?.id || -1) &&
        am.weightCategoriesIds.includes(weightCategory?.id || -1) &&
        am.hydraulicFlowsIds.includes(hydraulicFlow?.id || -1) &&
        am.materialLengthsIds.includes(materialLength?.id || -1);
    }).map((am) => {
      return {
        ...am,
        attachmentTypeName: attachmentsTypes.find((at) => at.name)?.name,
      }
    });

    if (matchingItems.length === 0) {
      return null; // No matching items found
    }

    return this.orderItemsByPrice(matchingItems);
  }

  async setAttachmentByParam(attachmentId: number): Promise<void> {
    this.attachment = await this.dataService.findById('attachments', attachmentId);
  }

  async matchedAttachmentsModels(): Promise<AttachmentModel[] | null> {
    const attachmentTypes: AttachmentType[] = await this.dataService.find('attachment-types', { attachmentId: this.attachment?.id });

    const attachmentTypesIds = attachmentTypes.map((at: AttachmentType) => at.id)

    const attachmentModels: AttachmentModel[] = (
      await this.dataService.find('attachments-models', {})
    ).filter((am: AttachmentModel) => attachmentTypesIds.includes(am.attachmentTypeId));

    const result = this.getMatchingItems(attachmentModels, attachmentTypes);

    return result;
  }
}
