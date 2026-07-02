import { OptionResponse } from './option.model';

export type SectionType = 'BEGIN' | 'NODE' | 'END';

export interface SectionResponse {
  id: number;
  text: string;
  type: SectionType;
  options: OptionResponse[];
}
