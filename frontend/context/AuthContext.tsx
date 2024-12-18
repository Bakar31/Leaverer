"use client";

import React, {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  useEffect,
} from "react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  organization: number | null;
};

type AuthState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
};

type Action =
  | { type: "LOGIN"; accessToken: string; user: User }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; user: User };

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  user: null,
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        accessToken: action.accessToken,
        user: action.user,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        accessToken: null,
        user: null,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC = ({ children }) => {
  const isBrowser = typeof window !== "undefined";
  const storedAuthState = isBrowser ? localStorage.getItem("authState") : null;
  const [state, dispatch] = useReducer(
    authReducer,
    storedAuthState ? JSON.parse(storedAuthState) : initialState
  );

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem("authState", JSON.stringify(state));
    }
  }, [state, isBrowser]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
