import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgClass, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { BookDetailsResponse } from '../../../../core/models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [NgClass, TitleCasePipe],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent {
  private readonly router = inject(Router);

  @Input({ required: true }) book!: BookDetailsResponse;
  @Output() beginQuest = new EventEmitter<BookDetailsResponse>();

  get difficulty(): string {
    return this.book.difficulty ?? this.book.difficultyLevel ?? 'EASY';
  }

  get sectionsCount(): number {
    return this.book.sections?.length ?? 0;
  }

  openDetails(): void {
    this.router.navigate(['/books', this.book.id]);
  }
}
