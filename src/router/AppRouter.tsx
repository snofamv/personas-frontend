import { createBrowserRouter } from "react-router";
import {
  AddPage,
  NotFound,
  PersonsPage,
  SearchPerson,
  UpdatePage,
} from "../persons";
import { Navbar } from "../persons/components/ui/Navbar";
import { Fragment } from "react/jsx-runtime";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <Fragment>
            <Navbar />
            <PersonsPage />
          </Fragment>
        ),
      },
      {
        path: "persons",
        element: (
          <Fragment>
            <Navbar />
            <PersonsPage />
          </Fragment>
        ),
      },
      {
        path: "search/",
        element: (
          <Fragment>
            <Navbar />
            <SearchPerson />
          </Fragment>
        ),
      },
      {
        path: "search/:rut",
        element: (
          <Fragment>
            <Navbar />
            <SearchPerson />
          </Fragment>
        ),
      },
      {
        path: "add/",
        element: (
          <Fragment>
            <Navbar />
            <AddPage />
          </Fragment>
        ),
      },
      {
        path: "update/:rut",
        element: (
          <Fragment>
            <Navbar />
            <UpdatePage />
          </Fragment>
        ),
      },

      { path: "/*", Component: NotFound },
    ],
  },
]);
