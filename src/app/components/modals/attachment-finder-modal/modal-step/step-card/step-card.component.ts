import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step-card',
  templateUrl: './step-card.component.html',
  styleUrls: ['./step-card.component.scss']
})
export class StepCardComponent {
  @Input() option!: any;
  @Input() selected?: boolean
  @Input() stepId!: string;
}
