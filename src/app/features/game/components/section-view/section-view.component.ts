import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SectionResponse } from '../../../../core/models/section.model';
import { ChoiceListComponent } from '../choice-list/choice-list.component';

@Component({
  selector: 'app-section-view',
  standalone: true,
  imports: [ChoiceListComponent],
  templateUrl: './section-view.component.html',
  styleUrl: './section-view.component.scss',
})
export class SectionViewComponent {
  @Input({ required: true }) section!: SectionResponse;
  @Output() choiceSelected = new EventEmitter<number>();
}
