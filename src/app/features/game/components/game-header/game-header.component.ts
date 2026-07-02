import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameStatus } from '../../../../core/models/game.model';

@Component({
  selector: 'app-game-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-header.component.html',
  styleUrl: './game-header.component.scss',
})
export class GameHeaderComponent {
  @Input({ required: true }) bookTitle = 'Current Adventure';
  @Input({ required: true }) health = 10;
  @Input({ required: true }) status: GameStatus = 'PLAYING';

  @Output() pause = new EventEmitter<void>();
  @Output() stop = new EventEmitter<void>();
  @Output() play = new EventEmitter<void>();
}
