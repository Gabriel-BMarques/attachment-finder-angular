import { Component, Input } from '@angular/core';
import { AttachmentFinderStep } from 'src/app/_typings/attachment-finder-step';
import { MachineType } from 'src/app/_typings/machine-type';
import { DataService } from 'src/app/services/api/data.service';
import { AttachmentFinderService } from 'src/app/services/wizards/attachment-finder.service';

@Component({
  selector: 'app-modal-step',
  templateUrl: './modal-step.component.html',
  styleUrls: ['./modal-step.component.scss']
})
export class ModalStepComponent {
  @Input() step!: AttachmentFinderStep;
  @Input() index!: number;

  loading = true;
  options: any[] = [];
  optionsList: any[] = [];
  attachmentId: number = 1;
  stepTitle!: string;
  stepQuestion!: string | null;

  get selectedMachine(): MachineType | undefined {
    return this.attachmentFinderService.wizardData.machineType;
  }

  constructor(
    private dataService: DataService,
    private attachmentFinderService: AttachmentFinderService
  ) {}

  getModalTitleData(index: number): any[] {
    if (this.step.id === 'result') return [this.optionsList.length || 0, this.attachmentFinderService.attachment?.name]
    return [index + 1];
  }

  save(step: string, option: any): void {
    this.attachmentFinderService.save(step, option);
  }

  checkSelection(option: any): boolean {
    const { machineType, weightCategory, hydraulicFlow, materialLength } = this.attachmentFinderService.wizardData;
    switch (this.step.id) {
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
    const loadingTimeout = this.step.id === 'result' ? 2500 : 0
    await this.loadData();
    setTimeout(() => {
      this.loading = false;
    }, loadingTimeout);
  }

  async getOptionsByStepId(): Promise<any[] | null> {
    switch (this.step.id) {
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
      this.options = await this.dataService.find(this.step.table, {});
      this.optionsList = await this.getOptionsByStepId() || [];
      this.stepTitle = this.step.stepTitle(this.getModalTitleData(this.index));
      this.stepQuestion = this.step.stepQuestion(this.selectedMachine?.name);
      this.populateOptionsAdditionalInfo();
    } catch (error: any) {
      console.log('Error while loading data', error)
    }
  }
}
