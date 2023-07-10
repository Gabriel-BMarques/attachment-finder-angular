import { Component, Input, OnInit } from '@angular/core';
import { AttachmentModel } from 'src/app/_typings/attachment-model';
import { DataService } from 'src/app/services/api/data.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: AttachmentModel;
  @Input() isLast!: boolean;

  attachmentTypeName!: string;

  constructor(
    private dataService: DataService
  ) {}

  async ngOnInit(): Promise<void> {
    this.attachmentTypeName = await this.getAttachmentTypeName(this.product.attachmentTypeId);
  }

  async getAttachmentTypeName(typeId: number): Promise<string> {
    const typeName = (await this.dataService.findById('attachment-types', typeId)).name;
    return typeName;
  }
}
