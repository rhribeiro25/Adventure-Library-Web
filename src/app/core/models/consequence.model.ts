export type ConsequenceType = 'LOSE_HEALTH' | 'GAIN_HEALTH' | 'NOTHING';

export interface ConsequenceResponse {
  type: ConsequenceType;
  value?: number;
  text?: string;
}

export interface ConsequenceRequest {
  type: ConsequenceType;
  value?: number;
  text?: string;
}

