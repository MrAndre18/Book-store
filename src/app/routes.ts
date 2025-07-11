import { createBrowserRouter } from "react-router";
import { AppLayout } from "@shared/ui";
import { HomePage } from "@pages/home";
import { FavoritesPage } from "@pages/favorites";
import { BookPage } from "@pages/book";
import { routes } from "@shared/routes";
// import { NotFoundPage } from "@pages/not-found";

export const router = createBrowserRouter([
  {
    path: routes.home,
    Component: AppLayout,
    children: [
      //* Главная
      {
        index: true,
        Component: HomePage,
      },
      //* Каталог
      // {
      //   path: routes.catalog,
      //   Component: CatalogPage,
      // },
      //* Избранное
      {
        path: routes.favorites,
        Component: FavoritesPage,
      },
      //* Страница книги
      {
        path: routes.book,
        Component: BookPage,
      }
    ],
  },
  // {
  //   path: routes.notFound,
  //   Component: NotFoundPage
  // }
])