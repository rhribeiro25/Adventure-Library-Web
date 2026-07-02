import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiHttpService } from '../../../core/services/api-http.service';
import {
  BookDetailsResponse,
  BookSearchParams,
  CreateBookRequest,
  PageResponse,
  UpdateBookRequest
} from '../../../core/models/book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly api = inject(ApiHttpService);

  searchBooks(params: BookSearchParams): Observable<PageResponse<BookDetailsResponse>> {
    return this.api.get<PageResponse<BookDetailsResponse> | BookDetailsResponse[]>('/books', {
      page: 0,
      size: 20,
      sort: 'title',
      direction: 'asc',
      ...params,
    }).pipe(
      map((response) => Array.isArray(response)
        ? { content: response, totalElements: response.length, totalPages: 1, size: response.length, number: 0 }
        : response
      )
    );
  }

  getBookDetails(bookId: number): Observable<BookDetailsResponse> {
    return this.api.get<BookDetailsResponse>(`/books/${bookId}`);
  }

  createBook(request: CreateBookRequest): Observable<BookDetailsResponse> {
    return this.api.post<BookDetailsResponse>('/books', request);
  }

  updateBook(bookId: number, request: UpdateBookRequest): Observable<BookDetailsResponse> {
    return this.api.patch<BookDetailsResponse>(`/books/${bookId}`, request);
  }
}