import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { BookDetailsResponse, DifficultyLevel } from '../../../../core/models/book.model';
import { GameResponse } from '../../../../core/models/game.model';
import { BookService } from '../../services/book.service';
import { GameService } from '../../../game/services/game.service';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-library-page',
  standalone: true,
  imports: [FormsModule, BookCardComponent],
  templateUrl: './library-page.component.html',
  styleUrl: './library-page.component.scss',
})
export class LibraryPageComponent {
  private readonly bookService = inject(BookService);
  private readonly gameService = inject(GameService);
  private readonly router = inject(Router);

  readonly books = signal<BookDetailsResponse[]>([]);
  readonly loading = signal(false);
  readonly query = signal('');
  readonly category = signal('');
  readonly difficulty = signal<DifficultyLevel | ''>('');
  readonly error = signal<string | null>(null);

  readonly visibleCount = computed(() => this.books().length);

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading.set(true);
    this.error.set(null);

    this.bookService.searchBooks({
      query: this.query(),
      category: this.category(),
      difficulty: this.difficulty(),
      page: 0,
      size: 20,
      sort: 'title',
      direction: 'asc',
    }).pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (page) => this.books.set(page.content ?? []),
        error: () => this.error.set('Unable to load adventures. Please check if the backend is running.'),
      });
  }

  setCategory(value: string): void {
    this.category.set(this.category() === value ? '' : value);
    this.loadBooks();
  }

  setDifficulty(value: DifficultyLevel): void {
    this.difficulty.set(this.difficulty() === value ? '' : value);
    this.loadBooks();
  }

  beginQuest(book: BookDetailsResponse): void {
    this.gameService.startGame(book.id, {
      playerName: 'Adventurer',
      playerEmail: 'adventurer@example.com',
    }).subscribe({
      next: (game: GameResponse) => this.router.navigate(['/games', game.id]),
      error: () => this.error.set('Unable to start the game.'),
    });
  }
}
