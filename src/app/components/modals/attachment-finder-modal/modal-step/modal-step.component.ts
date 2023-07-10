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
  optionsList: any[] | null = [];
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
    await this.attachmentFinderService.setAttachmentByParam(this.attachmentId);
    this.options = await this.dataService.find(this.table, {});
    this.optionsList = await this.getOptionsByStepId();
  }
}
