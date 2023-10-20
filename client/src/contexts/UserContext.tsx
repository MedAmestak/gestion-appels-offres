// UserContext.tsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import jwt_decode from 'jwt-decode';

interface User {
  role: string;
  username: string;
  token: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const verifyToken = useCallback((token: string) => {
    try {
      const decodedToken: { username: string; role: string, id: string } = jwt_decode(token);
      console.log('Decoded JWT Payload:', decodedToken);

      // Call the function to fetch user data by userId
      getUserById(decodedToken.id)
        .then((userFromDb) => {
          if (userFromDb && userFromDb.role === decodedToken.role) {
            // Token matches your expectations and user data is correct
            // You can proceed with using it for authentication in your application
          } else {
            // Token does not match your expectations or user data is incorrect, handle accordingly
          }
        })
        .catch((error) => {
          // Handle database error
          console.error('Error fetching user:', error);
        });
    } catch (error) {
      // Handle token verification error
      console.error('Token verification error:', error);
    }
  }, []);

  const getUserById = async (userId: string) => {
    try {
      const response = await fetch(`/api/${userId}`);
      if (response.ok) {
        const userFromDb = await response.json();
        return userFromDb;
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      verifyToken(user.token);
    } else {
      localStorage.removeItem('user');
    }
  }, [user, verifyToken]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
