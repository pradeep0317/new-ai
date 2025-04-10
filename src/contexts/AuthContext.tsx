
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'doctor' | 'nurse' | 'staff';
  department: string;
  lastLogin: Date;
  riskScore: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'lastLogin' | 'riskScore'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  calculateRiskScore: () => number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for simulation
const DEMO_USERS = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@hospital.org',
    password: 'admin123',
    role: 'admin' as const,
    department: 'IT Security',
    lastLogin: new Date(),
    riskScore: 15
  },
  {
    id: '2',
    username: 'doctor',
    email: 'doctor@hospital.org',
    password: 'doctor123',
    role: 'doctor' as const,
    department: 'Cardiology',
    lastLogin: new Date(),
    riskScore: 25
  },
  {
    id: '3',
    username: 'nurse',
    email: 'nurse@hospital.org',
    password: 'nurse123',
    role: 'nurse' as const,
    department: 'Emergency',
    lastLogin: new Date(),
    riskScore: 35
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('mediguard_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser({
          ...userData,
          lastLogin: new Date(userData.lastLogin)
        });
      } catch (err) {
        console.error('Failed to restore user session:', err);
        localStorage.removeItem('mediguard_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Demo authentication logic
      const user = DEMO_USERS.find(u => u.email === email && u.password === password);
      
      if (!user) {
        setError('Invalid email or password');
        toast.error('Authentication failed', {
          description: 'Invalid email or password'
        });
        setIsLoading(false);
        return false;
      }
      
      // Calculate simulated risk score
      const riskScore = calculateRiskScore();
      
      // Successfully logged in
      const userData: User = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        department: user.department,
        lastLogin: new Date(),
        riskScore
      };
      
      setUser(userData);
      localStorage.setItem('mediguard_user', JSON.stringify(userData));
      
      toast.success('Login successful', {
        description: `Welcome back, ${user.username}!`
      });
      
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
      toast.error('Authentication failed', {
        description: 'An unexpected error occurred'
      });
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData: Omit<User, 'id' | 'lastLogin' | 'riskScore'> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Check if user already exists
      if (DEMO_USERS.some(u => u.email === userData.email)) {
        setError('User with this email already exists');
        toast.error('Registration failed', {
          description: 'User with this email already exists'
        });
        setIsLoading(false);
        return false;
      }
      
      // In a real app, we would create the user in the database
      // For demo, we'll just simulate success
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        username: userData.username,
        email: userData.email,
        role: userData.role,
        department: userData.department,
        lastLogin: new Date(),
        riskScore: 50 // Initial risk score for new users
      };
      
      setUser(newUser);
      localStorage.setItem('mediguard_user', JSON.stringify(newUser));
      
      toast.success('Registration successful', {
        description: `Welcome to MediGuard, ${userData.username}!`
      });
      
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred');
      toast.error('Registration failed', {
        description: 'An unexpected error occurred'
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mediguard_user');
    toast.info('Logged out successfully');
  };

  const calculateRiskScore = (): number => {
    // Simulate risk score calculation
    // In a real system, this would incorporate:
    // - Password strength
    // - Login time (in/out of typical hours)
    // - Location/IP
    // - USB devices
    // - System vulnerabilities
    // - Behavioral patterns
    
    // Generate a score between 0-100, where lower is better
    const baseScore = Math.floor(Math.random() * 30); // Base risk 0-30
    
    // Add risk if login is outside normal hours
    const hour = new Date().getHours();
    const timeRisk = (hour < 6 || hour > 20) ? 30 : 0;
    
    // Random factor for other risk elements
    const otherRisk = Math.floor(Math.random() * 40);
    
    return Math.min(baseScore + timeRisk + otherRisk, 100);
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    calculateRiskScore
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
