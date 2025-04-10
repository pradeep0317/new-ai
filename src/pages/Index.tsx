
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Just redirect to login
  return <Navigate to="/login" replace />;
};

export default Index;
