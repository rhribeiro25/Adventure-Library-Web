import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionResponse } from '../../../../core/models/option.model';

@Component({
  selector: 'app-choice-list',
  standalone: true,
  templateUrl: './choice-list.component.html',
  styleUrl: './choice-list.component.scss',
})
export class ChoiceListComponent {
  @Input() options: OptionResponse[] = [];
  @Output() choiceSelected = new EventEmitter<number>();
}
