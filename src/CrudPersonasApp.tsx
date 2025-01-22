import { RouterProvider } from "react-router";
import { AppTheme } from "./persons/theme";
import { AppRouter } from "./router/AppRouter";

export const CrudPersonasApp = () => {
  return (
    <AppTheme>
      <RouterProvider router={AppRouter} />
    </AppTheme>
  );
};
