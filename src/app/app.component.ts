import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { DataService } from './services/api/data.service';
import { Attachment } from './_typings/attachment';
import { AttachmentFinderService } from './services/wizards/attachment-finder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options!: Attachment[];
  selectedOption?: any;
  modalOpen = false;

  get attachmentSelected(): boolean {
    return !!this.attachmentFinderService.attachment;
  }

  constructor(
    private translate: TranslateService,
    private dataService: DataService,
    private attachmentFinderService: AttachmentFinderService
  ) {
    this.loadOptions();
    translate.setDefaultLang('en');
    translate.use('en');
  }

  onOptionChange(option: string) {
    this.attachmentFinderService.setAttachmentByParam(parseInt(option, 10));
  }

  openModal(): void {
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
    console.log(this.modalOpen);
    this.attachmentFinderService.resetWizard();
  }

  async loadOptions(): Promise<void> {
    this.options = await this.dataService.find('attachments', {});
  }
}
