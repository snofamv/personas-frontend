import { createContext } from "react";

interface AuthContextProps {
  globalData: {};
}
export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);
