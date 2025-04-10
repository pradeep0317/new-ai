
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background security-grid-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-mediguard-600/20 to-transparent pointer-events-none" />
      
      <div className="relative w-full max-w-md px-4 sm:px-0 animate-fade-in">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full p-4">
          <div className="flex items-center justify-center">
            <Shield className="h-10 w-10 text-mediguard-600" />
            <span className="ml-2 text-2xl font-bold text-foreground">MediGuard</span>
          </div>
        </div>
        
        <Card className="border-mediguard-200 shadow-lg backdrop-blur-sm bg-card/95">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-foreground">Secure Login</CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Enter your credentials to access the secure hospital network
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md flex items-center text-sm">
                  <AlertCircle className="h-4 w-4 mr-2 text-destructive" />
                  <span className="text-destructive">{error}</span>
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-input"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-input pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-mediguard-600" />
                <span className="text-xs text-muted-foreground">
                  Protected by MediGuard Secure Access Protocol
                </span>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin mr-2" />
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </div>
                )}
              </Button>
              
              <p className="text-sm text-center text-muted-foreground">
                Need an account?{' '}
                <Link to="/register" className="text-primary hover:underline">
                  Register
                </Link>
              </p>
              
              <div className="text-xs text-center text-muted-foreground">
                <p>Demo accounts:</p>
                <p>admin@hospital.org / admin123</p>
                <p>doctor@hospital.org / doctor123</p>
                <p>nurse@hospital.org / nurse123</p>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>© 2025 MediGuard Secure Haven. All rights reserved.</p>
          <p>HIPAA Compliant | ISO 27001 Certified</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
