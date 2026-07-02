import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import {
  CategoryRequest,
  CategoryResponse,
} from "../../../core/models/category.model";
import { ApiHttpService } from "../../../core/services/api-http.service";

@Injectable({ providedIn: "root" })
export class CategoryService {
  private readonly api = inject(ApiHttpService);

  create(request: CategoryRequest): Observable<CategoryResponse> {
    return this.api.post<CategoryResponse>(`/categories`, request);
  }
}
