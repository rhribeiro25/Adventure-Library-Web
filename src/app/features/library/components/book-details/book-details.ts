import { Component, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BookService } from "../../services/book.service";
import { CategoryService } from "../../services/category.service";
import { SectionResponse } from "../../../../core/models/section.model";

export interface Category {
  id: number;
  name: string;
}

export interface BookDetails {
  id: number;
  title: string;
  author: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  categories: Category[];
  sections: SectionResponse[];
}

@Component({
  selector: "app-book-details",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./book-details.html",
  styleUrl: "./book-details.scss",
})
export class BookDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);
  private categoryService = inject(CategoryService);

  book = signal<BookDetails | null>(null);
  categories = signal<Category[]>([]);
  selectedCategoryId: number | null = null;
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const bookId = Number(this.route.snapshot.paramMap.get("bookId"));
    this.loadBook(bookId);
  }

  loadBook(bookId: number): void {
    this.loading.set(true);

    this.bookService.getBookDetails(bookId).subscribe({
      next: (book) => {
        this.book.set(book);
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Could not load book details.");
        this.loading.set(false);
      },
    });
  }

  addCategory(): void {
    const book = this.book();

    if (!book || !this.selectedCategoryId) {
      return;
    }

    const currentIds = book.categories.map((category) => category.id);

    if (currentIds.includes(this.selectedCategoryId)) {
      return;
    }

    this.updateCategories(book.id, [...currentIds, this.selectedCategoryId]);
  }

  removeCategory(categoryId: number): void {
    const book = this.book();

    if (!book) {
      return;
    }

    const categoryIds = book.categories
      .map((category) => category.id)
      .filter((id) => id !== categoryId);

    this.updateCategories(book.id, categoryIds);
  }

  private updateCategories(bookId: number, categoryIds: number[]): void {
    this.loading.set(true);

    this.bookService
      .updateBook(bookId, {
        categories: categoryIds,
      })
      .subscribe({
        next: (updatedBook) => {
          this.book.set(updatedBook);
          this.selectedCategoryId = null;
          this.loading.set(false);
        },
        error: () => {
          this.error.set("Could not update book categories.");
          this.loading.set(false);
        },
      });
  }

  availableCategories(): Category[] {
    const book = this.book();

    if (!book) {
      return this.categories();
    }

    const currentIds = new Set(book.categories.map((category) => category.id));

    return this.categories().filter((category) => !currentIds.has(category.id));
  }

  categoryName = "";

  addCategoryByName(): void {
    const book = this.book();
    const name = this.categoryName.trim();

    console.log("Adding category with name:", name);

    if (!book || !name) {
      return;
    }

    this.categoryService.create({ name }).subscribe({
      next: (createdCategory) => {
        const currentCategoryIds =
          book.categories?.map((category) => category.id) ?? [];

        const categoryIds = [...currentCategoryIds, createdCategory.id];

        this.bookService
          .updateBook(book.id, { categories: categoryIds })
          .subscribe({
            next: (updatedBook) => {
              this.book.set(updatedBook);
              this.categoryName = "";
            },
            error: () => this.error.set("Could not update book categories."),
          });
      },
      error: () => this.error.set("Could not create category."),
    });
  }
}
