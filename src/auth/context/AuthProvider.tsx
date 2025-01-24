import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<object>({});

  return (
    <AuthContext.Provider value={{ globalData: state }}>
      {children}
    </AuthContext.Provider>
  );
};
