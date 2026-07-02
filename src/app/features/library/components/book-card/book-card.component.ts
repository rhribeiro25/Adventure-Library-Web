import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, TitleCasePipe } from '@angular/common';
import { BookDetailsResponse } from '../../../../core/models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [NgClass, TitleCasePipe],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent {
  @Input({ required: true }) book!: BookDetailsResponse;
  @Output() beginQuest = new EventEmitter<BookDetailsResponse>();

  get difficulty(): string {
    return this.book.difficulty ?? this.book.difficultyLevel ?? 'EASY';
  }

  get sectionsCount(): number {
    return this.book.sections?.length ?? 0;
  }
}
