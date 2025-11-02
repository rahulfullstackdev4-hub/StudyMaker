
import { createContext, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import api from "../utils/api";

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth();

  // For backward compatibility, map Clerk user to the old user object
  const user = userId ? { id: userId, sessionId } : null;

  // Function to get Clerk token
  const getClerkToken = async () => {
    return await getToken();
  };

  // Set up API interceptor when auth is loaded
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

      // Cleanup: eject the interceptor when component unmounts or dependencies change
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
