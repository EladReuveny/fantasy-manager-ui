import { createContext, useState, type ReactNode } from "react";
import type { User } from "../types/user";

type AuthContextType = {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (user: User) => {
    setUser(user);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
