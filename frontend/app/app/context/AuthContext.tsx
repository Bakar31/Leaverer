// "use client";

// import React, { createContext, useState, useEffect, useContext } from "react";

// interface AuthContextProps {
//   accessToken: string | null;
//   saveToken: (token: string) => void;
//   clearToken: () => void;
// }

// const AuthContext = createContext<AuthContextProps>({
//   accessToken: null,
//   saveToken: () => {},
//   clearToken: () => {},
// });

// const AuthProvider: React.FC = ({ children }) => {
//   const [accessToken, setAccessToken] = useState<string | null>(
//     localStorage.getItem('accessToken') || null
//   );

//   useEffect(() => {
//     const storedToken = localStorage.getItem("accessToken");
//     if (storedToken) {
//       setAccessToken(storedToken);
//     }
//   }, []);

//   const saveToken = (token: string) => {
//     setAccessToken(token);
//     localStorage.setItem("accessToken", token);
//   };

//   const clearToken = () => {
//     setAccessToken(null);
//     localStorage.removeItem("accessToken");
//   };

//   return (
//     <AuthContext.Provider value={{ accessToken, saveToken, clearToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => {
//   return useContext(AuthContext);
// };

// export { AuthProvider, useAuth };
