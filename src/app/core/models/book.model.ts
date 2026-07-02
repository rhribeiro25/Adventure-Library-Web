import { CategoryResponse } from './category.model';
import { SectionResponse } from './section.model';

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

export interface BookDetailsResponse {
  id: number;
  title: string;
  author: string;
  difficulty: DifficultyLevel;
  difficultyLevel?: DifficultyLevel;
  categories: CategoryResponse[];
  sections: SectionResponse[];
}

export interface BookSearchParams {
  query?: string;
  title?: string;
  author?: string;
  difficulty?: DifficultyLevel | '';
  category?: string;
  page?: number;
  size?: number;
  sort?: string;
  direction?: 'asc' | 'desc';
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
