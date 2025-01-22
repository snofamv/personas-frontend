import { createBrowserRouter } from "react-router";
import {
  AddPage,
  NotFound,
  PersonsPage,
  SearchPerson,
  UpdatePage,
} from "../persons";
import AppLayout from "../persons/layout/AppLayout";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <AppLayout>
            <PersonsPage />
          </AppLayout>
        ),
      },
      {
        path: "persons/",
        element: (
          <AppLayout>
            <PersonsPage />
          </AppLayout>
        ),
      },
      {
        path: "search/",
        element: (
          <AppLayout>
            <SearchPerson />
          </AppLayout>
        ),
      },
      {
        path: "search/:rut",

        element: (
          <AppLayout>
            <SearchPerson />
          </AppLayout>
        ),
      },
      {
        path: "add/",
        element: (
          <AppLayout>
            <AddPage />
          </AppLayout>
        ),
      },
      {
        path: "update/:rut",
        element: (
          <AppLayout>
            <UpdatePage />
          </AppLayout>
        ),
      },

      {
        path: "/*",
        element: (
          <AppLayout>
            <NotFound />
          </AppLayout>
        ),
      },
    ],
  },
]);
