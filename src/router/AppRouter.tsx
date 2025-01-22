import { createBrowserRouter } from "react-router";
import {
  AddPage,
  NotFound,
  PersonsPage,
  SearchPerson,
  UpdatePage,
} from "../persons";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <PersonsPage />,
      },
      {
        path: "persons",
        element: <PersonsPage />,
      },
      {
        path: "search/",
        element: <SearchPerson />,
      },
      {
        path: "search/:rut",
        element: <SearchPerson />,
      },
      {
        path: "add/",
        element: <AddPage />,
      },
      {
        path: "update/:rut",
        element: <UpdatePage />,
      },

      { path: "/*", Component: NotFound },
    ],
  },
]);
