import { createContext, useContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  totalBreakSecondInDrawer: number;
  setTotalBreakSecondInDrawer: (seconds: number) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  totalBreakSecondInDrawer: 0,
  setTotalBreakSecondInDrawer: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [totalBreakSecondInDrawer, setTotalBreakSecondInDrawer] = useState<number>(0);
console.log(totalBreakSecondInDrawer,"totalBreakSecondInDrawer")
  return (
    <AuthContext.Provider
      value={{ token, setToken, setTotalBreakSecondInDrawer, totalBreakSecondInDrawer }}
    >
      {children}
    </AuthContext.Provider>
  );
};
