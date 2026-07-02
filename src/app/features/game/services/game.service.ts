import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from '../../../core/services/api-http.service';
import { GameResponse, GameStatus, StartGameRequest } from '../../../core/models/game.model';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly api = inject(ApiHttpService);

  startGame(bookId: number, request: StartGameRequest): Observable<GameResponse> {
    return this.api.post<GameResponse>(`/games/${bookId}/games`, request);
  }

  getGameDetails(gameId: number): Observable<GameResponse> {
    return this.api.get<GameResponse>(`/games/${gameId}`);
  }

  chooseOption(gameId: number, optionId: number): Observable<GameResponse> {
    return this.api.patch<GameResponse>(`/games/${gameId}/choices`, undefined, { optionId });
  }

  updateStatus(gameId: number, status: GameStatus): Observable<GameResponse> {
    return this.api.patch<GameResponse>(`/games/${gameId}`, undefined, { status });
  }
}
