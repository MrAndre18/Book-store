import { createBrowserRouter } from "react-router";
import { AppLayout } from "@shared/ui";
import { HomePage } from "@pages/home";
import { FavoritesPage } from "@pages/favorites";
import { BookPage } from "@pages/book";
import { NotFoundPage } from "@pages/not-found";
import { routes } from "@shared/routes";

export const router = createBrowserRouter([
  {
    path: routes.home,
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: routes.favorites,
        Component: FavoritesPage,
      },
      {
        path: routes.book,
        Component: BookPage,
      }
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  }
])