import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class ApiHttpService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_BASE_URL;

  get<T>(url: string, params?: Record<string, unknown>): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${url}`, { params: this.toHttpParams(params) });
  }

  post<T>(url: string, body?: unknown, params?: Record<string, unknown>): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${url}`, body ?? {}, { params: this.toHttpParams(params) });
  }

  patch<T>(url: string, body?: unknown, params?: Record<string, unknown>): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${url}`, body ?? {}, { params: this.toHttpParams(params) });
  }

  private toHttpParams(params?: Record<string, unknown>): HttpParams {
    let httpParams = new HttpParams();
    if (!params) return httpParams;

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });

    return httpParams;
  }
}
