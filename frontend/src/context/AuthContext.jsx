
import { createContext, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth();

  
  const user = userId ? { id: userId, sessionId } : null;

  
  const getClerkToken = async () => {
    return await getToken();
  };

  
  useEffect(() => {
    if (isLoaded) {
      const interceptor = api.interceptors.request.use(async (config) => {
        if (isSignedIn) {
          try {
            const token = await getToken();
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          } catch (error) {
            console.error("Error getting Clerk token:", error);
          }
        }
        return config;
      });

      
      return () => {
        api.interceptors.request.eject(interceptor);
      };
    }
  }, [isLoaded, isSignedIn, getToken]);

  return (
    <AuthContext.Provider value={{ user, isLoaded, getClerkToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
