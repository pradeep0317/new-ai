
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, BarChart3, AlertTriangle, Usb, Users, Settings, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
    { icon: AlertTriangle, label: 'Risk Analysis', path: '/risk-analysis' },
    { icon: Usb, label: 'USB Monitoring', path: '/usb-monitoring' },
    { icon: Users, label: 'User Behavior', path: '/user-behavior' },
    { icon: Shield, label: 'System Security', path: '/system-security' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden mr-2" 
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-mediguard-600" />
            <span className="ml-2 text-xl font-bold">MediGuard</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium">{user?.username}</p>
            <p className="text-xs text-muted-foreground">{user?.role}</p>
          </div>
          
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`
            fixed md:relative z-10 md:z-auto inset-y-0 left-0 
            w-64 bg-sidebar border-r border-sidebar-border
            transform transition-transform duration-200 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            flex flex-col
          `}
        >
          <div className="p-4 border-b border-sidebar-border">
            <div className="text-sidebar-foreground/80 text-sm">Security Status</div>
            <div className="mt-1 flex items-center">
              <div className={`h-2.5 w-2.5 rounded-full ${
                user?.riskScore && user.riskScore < 30 
                  ? 'bg-green-500' 
                  : user?.riskScore && user.riskScore < 70 
                  ? 'bg-yellow-500' 
                  : 'bg-red-500'
              } mr-2 animate-pulse`}></div>
              <span className="font-medium text-sidebar-foreground">
                {user?.riskScore && user.riskScore < 30 
                  ? 'Secure' 
                  : user?.riskScore && user.riskScore < 70 
                  ? 'Warning' 
                  : 'Critical'}
              </span>
            </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm 
                  ${window.location.pathname === item.path 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                  } transition-colors duration-150`}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-sidebar-border">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground" 
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </Button>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="text-sm text-muted-foreground">
              Last scan: {new Date().toLocaleTimeString()}
            </div>
          </div>
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
