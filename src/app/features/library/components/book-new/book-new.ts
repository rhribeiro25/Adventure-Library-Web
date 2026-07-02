import { Component, inject } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { BookService } from "../../services/book.service";
import { CreateBookRequest } from "../../../../core/models/book.model";

@Component({
  selector: "app-book-new",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./book-new.html",
  styleUrls: ["./book-new.scss"],
})
export class BookNewComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private bookService = inject(BookService);

  form = this.fb.group({
    title: ["", Validators.required],
    author: ["", Validators.required],
    difficulty: ["EASY", Validators.required],
    sections: this.fb.array([]),
  });

  get sections(): FormArray {
    return this.form.get("sections") as FormArray;
  }

  newSection(): void {
    const section = this.fb.group({
      id: [this.sections.length + 1, Validators.required],
      text: ["", Validators.required],
      type: ["BEGIN", Validators.required],
      options: this.fb.array([]),
    });
    this.sections.push(section);
  }

  removeSection(index: number): void {
    this.sections.removeAt(index);
  }

  getOptions(sectionIndex: number): FormArray {
    return this.sections.at(sectionIndex).get("options") as FormArray;
  }

  newOption(sectionIndex: number): void {
    const option = this.fb.group({
      description: ["", Validators.required],
      gotoId: [0, Validators.required],
      consequence: this.fb.group({
        type: ["LOSE_HEALTH"],
        value: [0],
        text: [""],
      }),
    });
    this.getOptions(sectionIndex).push(option);
  }

  removeOption(sectionIndex: number, optionIndex: number): void {
    this.getOptions(sectionIndex).removeAt(optionIndex);
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value as CreateBookRequest;

    this.bookService.createBook(payload).subscribe({
      next: (createdBook) => {
        console.log("Book created successfully:", createdBook);
        this.router.navigate(["/books", createdBook.id]);
      },
      error: () => {
        console.error("Failed to create book");
      },
    });
  }
}
