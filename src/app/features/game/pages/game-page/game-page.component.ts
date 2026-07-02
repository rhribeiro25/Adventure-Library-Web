import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { BookDetailsResponse } from '../../../../core/models/book.model';
import { GameResponse, GameStatus } from '../../../../core/models/game.model';
import { SectionResponse } from '../../../../core/models/section.model';
import { BookService } from '../../../library/services/book.service';
import { GameService } from '../../services/game.service';
import { GameHeaderComponent } from '../../components/game-header/game-header.component';
import { SectionViewComponent } from '../../components/section-view/section-view.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [GameHeaderComponent, SectionViewComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly gameService = inject(GameService);
  private readonly bookService = inject(BookService);

  readonly game = signal<GameResponse | null>(null);
  readonly book = signal<BookDetailsResponse | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly currentSection = computed<SectionResponse | null>(() => {
    const book = this.book();
    const game = this.game();
    if (!book || !game) return null;
    return book.sections.find((section) => section.id === game.currentSectionNumber) ?? null;
  });

  readonly bookTitle = computed(() => this.book()?.title ?? this.game()?.bookTitle ?? 'Current Adventure');

  ngOnInit(): void {
    const gameId = Number(this.route.snapshot.paramMap.get('gameId'));
    const bookId = Number(this.route.snapshot.paramMap.get('bookId'));

    if (gameId) {
      this.loadExistingGame(gameId);
      return;
    }

    if (bookId) {
      this.startNewGame(bookId);
      return;
    }

    this.router.navigate(['/']);
  }

  chooseOption(optionId: number): void {
    const game = this.game();
    if (!game) return;

    this.gameService.chooseOption(game.id, optionId).subscribe({
      next: (updatedGame) => this.game.set(updatedGame),
      error: () => this.error.set('Unable to apply this choice.'),
    });
  }

  updateStatus(status: GameStatus): void {
    const game = this.game();
    if (!game) return;

    this.gameService.updateStatus(game.id, status).subscribe({
      next: (updatedGame) => this.game.set(updatedGame),
      error: () => this.error.set(`Unable to update game status to ${status}.`),
    });
  }

  private loadExistingGame(gameId: number): void {
    this.loading.set(true);
    this.gameService.getGameDetails(gameId)
      .pipe(switchMap((game) => {
        this.game.set(game);
        return this.bookService.getBookDetails(game.bookId);
      }))
      .subscribe({
        next: (book) => {
          this.book.set(book);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Unable to load game details.');
          this.loading.set(false);
        },
      });
  }

  private startNewGame(bookId: number): void {
    this.loading.set(true);
    this.gameService.startGame(bookId, {
      playerName: 'Adventurer',
      playerEmail: 'adventurer@example.com',
    }).pipe(switchMap((game) => {
      this.game.set(game);
      return this.bookService.getBookDetails(game.bookId);
    })).subscribe({
      next: (book) => {
        this.book.set(book);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to start this adventure.');
        this.loading.set(false);
      },
    });
  }
}
