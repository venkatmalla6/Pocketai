import React from 'react';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({children}) => {
  // Bypass authentication - directly show the main app
  return <>{children}</>;
};

export default AuthWrapper;
