import { Component, Input } from '@angular/core';
import { AttachmentModel } from 'src/app/_typings/attachment-model';
import { HydraulicFlow } from 'src/app/_typings/hydraulic-flow';
import { MachineType } from 'src/app/_typings/machine-type';
import { MaterialLength } from 'src/app/_typings/material-length';
import { WeightCategory } from 'src/app/_typings/weight-category';
import { attachmentFinderSteps } from 'src/app/constants/attachment-finder/attachmet-finder-steps';
import { DataService } from 'src/app/services/api/data.service';
import { AttachmentFinderService } from 'src/app/services/wizards/attachment-finder.service';

@Component({
  selector: 'app-modal-step',
  templateUrl: './modal-step.component.html',
  styleUrls: ['./modal-step.component.scss']
})
export class ModalStepComponent {
  @Input() stepTitle!: string;
  @Input() stepQuestion!: string | null;
  @Input() stepId!: string;
  @Input() table!: string;

  loading = true;
  options: any[] = [];
  optionsList: any[] = [];
  attachmentId: number = 1;

  constructor(
    private dataService: DataService,
    private attachmentFinderService: AttachmentFinderService
  ) {}

  save(step: string, option: any): void {
    this.attachmentFinderService.save(step, option);
  }

  checkSelection(option: any): boolean {
    const { machineType, weightCategory, hydraulicFlow, materialLength } = this.attachmentFinderService.wizardData;
    switch (this.stepId) {
      case 'machineType':
        return option.id === machineType?.id
      case 'weigthCategory':
        return option.id === weightCategory?.id
      case 'hydraulicFlow':
        return option.id === hydraulicFlow?.id
      default:
        return option.id === materialLength?.id
    }
  }

  populateOptionsAdditionalInfo() {
    const getOptionAdditionalInfo = (option: any) => {
      if (!option.min) return `max of ${option.max} ${option.unit}`
      if (!option.max) return `up to ${option.min} ${option.unit}`
      return `between ${option.min} and ${option.max} ${option.unit}`
    }

    this.optionsList?.map((op) => {
      const hasUnitData = !!op.unit;

      if (hasUnitData)
        op.additionalInfo = getOptionAdditionalInfo(op)
    })
  }

  async ngOnInit(): Promise<void> {
    await this.loadData();
    this.loading = false;
  }

  async getOptionsByStepId(): Promise<any[] | null> {
    switch (this.stepId) {
      case 'machineType':
        const compatibleMachinery = this.attachmentFinderService.attachment?.compatibleMachineryIds;
        return this.options.filter((o) => compatibleMachinery?.includes(o.id));
      case 'result':
        return await this.attachmentFinderService.matchedAttachmentsModels();
      default:
        return this.options;
    }
  }

  async loadData(): Promise<void> {
    try {
      await this.attachmentFinderService.setAttachmentByParam(this.attachmentId);
      this.options = await this.dataService.find(this.table, {});
      this.optionsList = await this.getOptionsByStepId() || [];
      this.populateOptionsAdditionalInfo();
    } catch (error: any) {
      console.log('Error while loading data', error)
    }
  }
}
