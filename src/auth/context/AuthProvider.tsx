import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<object>({});
  const handleSetState = (newState: any) => {
    setState((prev: any) => {
      return { ...prev, newState };
    });
  };

  return (
    <AuthContext.Provider value={{ globalData: state, handleSetState }}>
      {children}
    </AuthContext.Provider>
  );
};
