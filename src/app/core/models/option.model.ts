import { ConsequenceResponse } from './consequence.model';

export interface OptionResponse {
  id: number;
  description: string;
  gotoId: number;
  consequence?: ConsequenceResponse | null;
}
