import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, Clock, Fingerprint, Usb, Monitor, User, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/components/DashboardLayout';
import RiskScoreGauge from '@/components/RiskScoreGauge';
import { useAuth } from '@/contexts/AuthContext';

// Mock risk factors data
const riskFactors = [
  {
    id: 1,
    factor: 'Password Strength',
    description: 'Based on complexity and reuse',
    icon: <ShieldCheck className="h-4 w-4" />,
    score: 25,
    recommendation: 'Use a stronger password with special characters'
  },
  {
    id: 2,
    factor: 'Login Time Analysis',
    description: 'Based on typical access patterns',
    icon: <Clock className="h-4 w-4" />,
    score: 15,
    recommendation: 'No action needed, login times are within normal ranges'
  },
  {
    id: 3,
    factor: 'Facial Recognition',
    description: 'Biometric identity verification',
    icon: <Fingerprint className="h-4 w-4" />,
    score: 5,
    recommendation: 'Ensure proper lighting during facial verification'
  },
  {
    id: 4,
    factor: 'USB Device Control',
    description: 'Detection of unauthorized devices',
    icon: <Usb className="h-4 w-4" />,
    score: 40,
    recommendation: 'Remove unauthorized USB device from port 2'
  },
  {
    id: 5,
    factor: 'System Vulnerabilities',
    description: 'Based on security patch status',
    icon: <Monitor className="h-4 w-4" />,
    score: 35,
    recommendation: 'Apply pending security updates within 24 hours'
  }
];

// Mock recent security incidents
const recentIncidents = [
  {
    id: 1,
    type: 'Failed Login',
    user: 'john.doe',
    timestamp: '2 hours ago',
    severity: 'medium',
    details: 'Multiple failed login attempts from unusual location'
  },
  {
    id: 2,
    type: 'USB Device',
    user: 'mary.smith',
    timestamp: '4 hours ago',
    severity: 'high',
    details: 'Unauthorized USB storage device connected'
  },
  {
    id: 3,
    type: 'File Access',
    user: 'admin',
    timestamp: '1 day ago',
    severity: 'low',
    details: 'Attempted access to restricted patient records'
  },
  {
    id: 4,
    type: 'System Alert',
    user: 'system',
    timestamp: '2 days ago',
    severity: 'critical',
    details: 'Possible ransomware signature detected and blocked'
  }
];

const RiskAnalysis = () => {
  const { user } = useAuth();
  const [selectedFactor, setSelectedFactor] = useState<number | null>(null);
  
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

  // Get details for selected factor
  const selectedFactorDetails = riskFactors.find(f => f.id === selectedFactor);
  
  return (
    <DashboardLayout title="Risk Analysis & Threat Assessment">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Score Overview */}
        <Card className="lg:col-span-1 border-mediguard-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Risk Score Analysis</CardTitle>
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>
            <CardDescription>
              Current security risk assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <RiskScoreGauge score={user?.riskScore || 0} size="lg" />
            
            <div className="w-full mt-6 space-y-2">
              <div className="text-sm font-medium">Risk Level Breakdown</div>
              <div className="flex w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="bg-green-500 h-full" style={{ width: '30%' }}></div>
                <div className="bg-yellow-500 h-full" style={{ width: '40%' }}></div>
                <div className="bg-red-500 h-full" style={{ width: '30%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low (0-30)</span>
                <span>Medium (31-70)</span>
                <span>High (71-100)</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Risk Factors */}
        <Card className="lg:col-span-2 border-mediguard-200">
          <CardHeader>
            <CardTitle>Contributing Risk Factors</CardTitle>
            <CardDescription>
              Elements affecting the overall security risk score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskFactors.map((factor) => (
                <div 
                  key={factor.id}
                  className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                    selectedFactor === factor.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedFactor(factor.id === selectedFactor ? null : factor.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 rounded-full bg-muted">{factor.icon}</div>
                      <div>
                        <h4 className="font-medium">{factor.factor}</h4>
                        <p className="text-xs text-muted-foreground">{factor.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${
                        factor.score < 30 
                          ? 'text-green-500' 
                          : factor.score < 70 
                          ? 'text-yellow-500' 
                          : 'text-red-500'
                      }`}>
                        {factor.score}
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-full">
                    <Progress 
                      value={factor.score} 
                      className={`h-2 ${
                        factor.score < 30
                          ? 'bg-green-500/20 [&>div]:bg-green-500'
                          : factor.score < 70
                          ? 'bg-yellow-500/20 [&>div]:bg-yellow-500'
                          : 'bg-red-500/20 [&>div]:bg-red-500'
                      }`}
                    />
                  </div>
                  
                  {selectedFactor === factor.id && (
                    <div className="mt-4 text-sm p-3 bg-muted rounded-md">
                      <div className="font-medium mb-1">Recommendation:</div>
                      <p>{factor.recommendation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Security Incidents */}
      <Card className="mt-6 border-mediguard-200">
        <CardHeader>
          <CardTitle>Recent Security Incidents</CardTitle>
          <CardDescription>
            Potential security incidents that may affect risk scoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentIncidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {incident.type === 'Failed Login' && <User className="h-4 w-4 mr-2" />}
                      {incident.type === 'USB Device' && <Usb className="h-4 w-4 mr-2" />}
                      {incident.type === 'File Access' && <FileText className="h-4 w-4 mr-2" />}
                      {incident.type === 'System Alert' && <AlertTriangle className="h-4 w-4 mr-2" />}
                      {incident.type}
                    </div>
                  </TableCell>
                  <TableCell>{incident.user}</TableCell>
                  <TableCell>{incident.timestamp}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{incident.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default RiskAnalysis;
