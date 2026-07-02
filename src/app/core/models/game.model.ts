export type GameStatus = 'PLAYING' | 'PAUSED' | 'STOPPED' | 'WON' | 'LOST';

export interface StartGameRequest {
  playerName: string;
  playerEmail: string;
}

export interface GameResponse {
  id: number;
  playerName: string;
  health: number;
  status: GameStatus;
  bookId: number;
  currentSectionNumber: number;
  bookTitle?: string;
}
