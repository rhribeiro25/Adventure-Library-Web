import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./features/library/pages/library-page/library-page.component").then(
        (m) => m.LibraryPageComponent,
      ),
  },
  {
    path: "books/:bookId/play",
    loadComponent: () =>
      import("./features/game/pages/game-page/game-page.component").then(
        (m) => m.GamePageComponent,
      ),
  },
    {
    path: "books/:bookId",
    loadComponent: () =>
      import("./features/library/components/book-details/book-details").then(
        (m) => m.BookDetailsComponent,
      ),
  },
  {
    path: "games/:gameId",
    loadComponent: () =>
      import("./features/game/pages/game-page/game-page.component").then(
        (m) => m.GamePageComponent,
      ),
  },
  { path: "**", redirectTo: "" },
];
