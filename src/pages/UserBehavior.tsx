
import React, { useState, useEffect } from 'react';
import { Users, Clock, MapPin, Activity, AlertTriangle, FileText, Shield, Database } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import DashboardLayout from '@/components/DashboardLayout';

// Mock login time data - showing user login patterns
const loginTimeData = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  normal: Math.floor(Math.random() * 10) + (i >= 8 && i <= 17 ? 15 : 3), // Higher during work hours
  abnormal: Math.floor(Math.random() * 3) + (i >= 0 && i <= 5 ? 2 : 0) // Higher during night
}));

// Mock user activity by location
const locationData = [
  { location: 'Nurses Station', normal: 65, abnormal: 3 },
  { location: 'Doctor Offices', normal: 45, abnormal: 2 },
  { location: 'Reception', normal: 30, abnormal: 1 },
  { location: 'Lab', normal: 25, abnormal: 4 },
  { location: 'Admin', normal: 20, abnormal: 1 },
  { location: 'Emergency', normal: 15, abnormal: 0 }
];

// Mock abnormal user behaviors
const abnormalBehaviors = [
  {
    id: 1,
    user: 'john.smith',
    department: 'Radiology',
    behavior: 'Unusual login time',
    details: 'Logged in at 2:34 AM, outside normal work hours',
    severity: 'medium',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    user: 'sarah.johnson',
    department: 'Cardiology',
    behavior: 'Excessive file access',
    details: 'Accessed 47 patient records in 10 minutes',
    severity: 'high',
    timestamp: '1 day ago'
  },
  {
    id: 3,
    user: 'robert.williams',
    department: 'Administration',
    behavior: 'Location anomaly',
    details: 'Logged in from remote location not previously associated',
    severity: 'medium',
    timestamp: '3 days ago'
  },
  {
    id: 4,
    user: 'maria.garcia',
    department: 'Emergency',
    behavior: 'Privilege escalation',
    details: 'Attempted to access admin-level system functions',
    severity: 'critical',
    timestamp: '5 days ago'
  },
  {
    id: 5,
    user: 'david.brown',
    department: 'IT Support',
    behavior: 'Multiple failed logins',
    details: '5 failed login attempts before successful authentication',
    severity: 'low',
    timestamp: '1 week ago'
  }
];

// Mock data access patterns
const dataAccessPatterns = [
  {
    id: 1,
    dataType: 'Patient Records',
    normalAccess: 215,
    abnormalAccess: 12,
    trend: '-5%'
  },
  {
    id: 2,
    dataType: 'Medication Records',
    normalAccess: 178,
    abnormalAccess: 7,
    trend: '+8%'
  },
  {
    id: 3,
    dataType: 'Administrative Files',
    normalAccess: 92,
    abnormalAccess: 3,
    trend: '-2%'
  },
  {
    id: 4,
    dataType: 'Financial Data',
    normalAccess: 45,
    abnormalAccess: 9,
    trend: '+15%'
  }
];

const UserBehavior = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [filteredBehaviors, setFilteredBehaviors] = useState(abnormalBehaviors);
  
  useEffect(() => {
    if (selectedDepartment === 'all') {
      setFilteredBehaviors(abnormalBehaviors);
    } else {
      setFilteredBehaviors(abnormalBehaviors.filter(b => b.department.toLowerCase() === selectedDepartment));
    }
  }, [selectedDepartment]);
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  const handleInvestigate = (id: number) => {
    toast.info('Investigation initiated', {
      description: `Security team has been alerted about behavior ID ${id}`
    });
  };
  
  return (
    <DashboardLayout title="User Behavior Analysis">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Login Time Analysis */}
        <Card className="border-mediguard-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-mediguard-600" />
                Login Time Analysis
              </CardTitle>
            </div>
            <CardDescription>
              Normal vs. abnormal user login patterns over 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={loginTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="hour" 
                    tickFormatter={(hour) => `${hour}:00`}
                    label={{ value: 'Hour of Day', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis label={{ value: 'Login Count', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value, name) => [value, name === 'normal' ? 'Normal Logins' : 'Abnormal Logins']}
                    labelFormatter={(hour) => `${hour}:00 - ${hour+1}:00`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="normal" 
                    name="Normal Logins"
                    stroke="#0e7490" 
                    strokeWidth={2} 
                    dot={{ r: 0 }}
                    activeDot={{ r: 6, fill: '#0e7490', stroke: '#fff', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="abnormal" 
                    name="Abnormal Logins"
                    stroke="#ef4444" 
                    strokeWidth={2} 
                    dot={{ r: 0 }}
                    activeDot={{ r: 6, fill: '#ef4444', stroke: '#fff', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
                <span>Logins outside normal hours (8am-6pm) are monitored for suspicious activity</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Location-based Activity */}
        <Card className="border-mediguard-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-mediguard-600" />
                Location-based Activity
              </CardTitle>
            </div>
            <CardDescription>
              User activity patterns by hospital location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={locationData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" />
                  <YAxis dataKey="location" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="normal" name="Normal Activity" stackId="a" fill="#0e7490" />
                  <Bar dataKey="abnormal" name="Abnormal Activity" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1 text-mediguard-600" />
                <span>Abnormal activities are automatically flagged for security review</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Abnormal User Behaviors */}
      <Card className="mt-6 border-mediguard-200">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-mediguard-600" />
                Abnormal User Behaviors
              </CardTitle>
              <CardDescription>
                Potential security concerns from unusual user activities
              </CardDescription>
            </div>
            
            <div className="mt-4 sm:mt-0 w-full sm:w-auto">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="radiology">Radiology</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="administration">Administration</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="it support">IT Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead>Behavior</TableHead>
                  <TableHead className="hidden lg:table-cell">Details</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBehaviors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No abnormal behaviors found for the selected department.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBehaviors.map((behavior) => (
                    <TableRow key={behavior.id}>
                      <TableCell className="font-medium">
                        {behavior.user}
                        <div className="text-xs text-muted-foreground mt-1">
                          {behavior.timestamp}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{behavior.department}</TableCell>
                      <TableCell>{behavior.behavior}</TableCell>
                      <TableCell className="hidden lg:table-cell max-w-xs truncate">{behavior.details}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(behavior.severity)}`}>
                          {behavior.severity}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8"
                          onClick={() => handleInvestigate(behavior.id)}
                        >
                          Investigate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Data Access Patterns */}
      <Card className="mt-6 border-mediguard-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2 text-mediguard-600" />
            Data Access Patterns
          </CardTitle>
          <CardDescription>
            Normal vs. abnormal access patterns for sensitive data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data Type</TableHead>
                  <TableHead>Normal Access</TableHead>
                  <TableHead>Abnormal Access</TableHead>
                  <TableHead>Weekly Trend</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataAccessPatterns.map((pattern) => (
                  <TableRow key={pattern.id}>
                    <TableCell className="font-medium">{pattern.dataType}</TableCell>
                    <TableCell>{pattern.normalAccess}</TableCell>
                    <TableCell>{pattern.abnormalAccess}</TableCell>
                    <TableCell>
                      <span className={pattern.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'}>
                        {pattern.trend}
                      </span>
                    </TableCell>
                    <TableCell>
                      {pattern.abnormalAccess > 8 ? (
                        <Badge variant="destructive">Investigate</Badge>
                      ) : pattern.abnormalAccess > 3 ? (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                          Monitor
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                          Normal
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default UserBehavior;
