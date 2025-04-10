import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Database, Usb, UserCheck, RefreshCw, Zap, ShieldAlert } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import DashboardLayout from '@/components/DashboardLayout';
import SecurityMetricCard from '@/components/SecurityMetricCard';
import RiskScoreGauge from '@/components/RiskScoreGauge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CustomProgress } from '@/components/ui/custom-progress';
import { useAuth } from '@/contexts/AuthContext';

const generateRandomData = () => {
  return {
    activeThreats: Math.floor(Math.random() * 10),
    vulnerabilities: Math.floor(Math.random() * 30) + 10,
    securedData: Math.floor(Math.random() * 20) + 80, // percentage
    blockedUSBs: Math.floor(Math.random() * 5),
    monitoredUsers: Math.floor(Math.random() * 30) + 70,
    networkActivity: Array.from({ length: 7 }, () => ({
      day: '',
      value: Math.floor(Math.random() * 100)
    }))
  };
};

const setDaysForData = (data: any) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return data.networkActivity.map((item: any, index: number) => ({
    ...item,
    day: days[index]
  }));
};

const threatTypes = [
  { name: 'Malware', value: 4, color: '#ff4d4f' },
  { name: 'Phishing', value: 3, color: '#faad14' },
  { name: 'Unauthorized', value: 2, color: '#1890ff' },
  { name: 'Other', value: 1, color: '#52c41a' }
];

const Dashboard = () => {
  const { user, calculateRiskScore } = useAuth();
  const [dashboardData, setDashboardData] = useState(generateRandomData());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  useEffect(() => {
    setDashboardData(prevData => ({
      ...prevData,
      networkActivity: setDaysForData(prevData)
    }));
  }, []);
  
  const refreshData = () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      const newData = generateRandomData();
      setDashboardData({
        ...newData,
        networkActivity: setDaysForData(newData)
      });
      setIsRefreshing(false);
    }, 1200);
  };
  
  return (
    <DashboardLayout title="Security Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-1 border-mediguard-200 data-flow-bg">
          <CardHeader>
            <CardTitle>Overall Risk Score</CardTitle>
            <CardDescription>
              Calculated based on multiple security factors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <RiskScoreGauge score={user?.riskScore || 0} size="lg" />
              
              <div className="mt-4 w-full">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs">Risk Rating</span>
                  <span className="text-xs font-medium">
                    {user?.riskScore && user.riskScore < 30 
                      ? 'Low Risk' 
                      : user?.riskScore && user.riskScore < 70 
                      ? 'Medium Risk' 
                      : 'High Risk'}
                  </span>
                </div>
                <CustomProgress
                  value={user?.riskScore}
                  className="h-2"
                  indicatorClassName={
                    user?.riskScore && user.riskScore < 30
                      ? 'bg-green-500'
                      : user?.riskScore && user.riskScore < 70
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      
        <Card className="col-span-1 md:col-span-2 border-mediguard-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Threat Distribution</CardTitle>
              <CardDescription>Current security threats by category</CardDescription>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 gap-1"
              onClick={refreshData}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Updating...' : 'Refresh'}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={threatTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {threatTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value} threats`, name]}
                    contentStyle={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {threatTypes.map((type, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: type.color }}></div>
                  <span className="text-xs">{type.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <SecurityMetricCard
          title="Active Threats"
          value={dashboardData.activeThreats}
          icon={<ShieldAlert className="h-4 w-4" />}
          description="Threats requiring immediate attention"
          status={dashboardData.activeThreats > 5 ? 'danger' : dashboardData.activeThreats > 0 ? 'warning' : 'success'}
          trend={{ value: 12, isPositive: false }}
        />
        
        <SecurityMetricCard
          title="Vulnerabilities"
          value={dashboardData.vulnerabilities}
          icon={<AlertTriangle className="h-4 w-4" />}
          description="Detected system vulnerabilities"
          status={dashboardData.vulnerabilities > 25 ? 'danger' : dashboardData.vulnerabilities > 10 ? 'warning' : 'success'}
          trend={{ value: 5, isPositive: true }}
        />
        
        <SecurityMetricCard
          title="Secured Data"
          value={`${dashboardData.securedData}%`}
          icon={<Database className="h-4 w-4" />}
          description="Patient data with encryption"
          status={dashboardData.securedData < 85 ? 'danger' : dashboardData.securedData < 95 ? 'warning' : 'success'}
          trend={{ value: 3, isPositive: true }}
        />
        
        <SecurityMetricCard
          title="Blocked USBs"
          value={dashboardData.blockedUSBs}
          icon={<Usb className="h-4 w-4" />}
          description="Unauthorized USB connections blocked"
          status={dashboardData.blockedUSBs > 3 ? 'danger' : dashboardData.blockedUSBs > 0 ? 'warning' : 'success'}
          trend={{ value: 8, isPositive: true }}
        />
      </div>
      
      <Card className="mt-6 border-mediguard-200">
        <CardHeader>
          <CardTitle>Network Activity Monitoring</CardTitle>
          <CardDescription>Week-to-date security-relevant network traffic</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardData.networkActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} events`, 'Activity']}
                  contentStyle={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Activity"
                  stroke="#0e7490" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: '#0e7490' }}
                  activeDot={{ r: 6, fill: '#0891b2', stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="border-mediguard-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>System Security Status</CardTitle>
              <Shield className="h-5 w-5 text-mediguard-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Firewall</span>
                <span className="text-sm font-medium text-green-500">Active</span>
              </div>
              <CustomProgress value={100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Antivirus</span>
                <span className="text-sm font-medium text-green-500">Protected</span>
              </div>
              <CustomProgress value={100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Encryption</span>
                <span className="text-sm font-medium text-green-500">Enabled</span>
              </div>
              <CustomProgress value={100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Updates</span>
                <span className="text-sm font-medium text-yellow-500">Available (3)</span>
              </div>
              <CustomProgress value={85} className="h-2" indicatorClassName="bg-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-mediguard-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>User Behavior Monitoring</CardTitle>
              <UserCheck className="h-5 w-5 text-mediguard-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Normal Login Patterns</span>
                </div>
                <span className="text-sm font-medium">{dashboardData.monitoredUsers}%</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">Unusual Access Times</span>
                </div>
                <span className="text-sm font-medium">{100 - dashboardData.monitoredUsers}%</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-mediguard-600 mr-2"></div>
                  <span className="text-sm">Access Point Changes</span>
                </div>
                <span className="text-sm font-medium">{Math.floor(Math.random() * 10)}%</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm">Suspicious File Access</span>
                </div>
                <span className="text-sm font-medium">{Math.floor(Math.random() * 5)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
