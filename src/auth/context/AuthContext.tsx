import { createContext } from "react";

interface AuthContextProps {
  globalData: {};
  handleSetState: (newState: any) => any;
}
export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);
