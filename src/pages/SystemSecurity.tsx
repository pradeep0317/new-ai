import React, { useState } from 'react';
import { Shield, RefreshCw, AlertTriangle, CheckCircle, XCircle, Zap, Lock, Server, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CustomProgress } from '@/components/ui/custom-progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import DashboardLayout from '@/components/DashboardLayout';

// Mock vulnerabilities data
const vulnerabilitiesData = [
  {
    id: 1,
    name: 'CVE-2023-1234',
    component: 'Windows OS',
    severity: 'critical',
    status: 'open',
    description: 'Remote code execution vulnerability in Windows authentication',
    discoveredDate: '2023-11-15'
  },
  {
    id: 2,
    name: 'CVE-2023-5678',
    component: 'Apache Server',
    severity: 'high',
    status: 'patching',
    description: 'Buffer overflow vulnerability in HTTP request processing',
    discoveredDate: '2023-12-03'
  },
  {
    id: 3,
    name: 'CVE-2023-9012',
    component: 'Database Server',
    severity: 'medium',
    status: 'open',
    description: 'SQL injection vulnerability in query parameters',
    discoveredDate: '2023-12-10'
  },
  {
    id: 4,
    name: 'CVE-2023-3456',
    component: 'Network Firewall',
    severity: 'low',
    status: 'mitigated',
    description: 'Improper filtering of specific packet types',
    discoveredDate: '2023-10-21'
  },
  {
    id: 5,
    name: 'CVE-2023-7890',
    component: 'EMR Software',
    severity: 'high',
    status: 'open',
    description: 'Improper access control in patient record views',
    discoveredDate: '2023-12-15'
  }
];

// Mock system updates data
const systemUpdatesData = [
  {
    id: 1,
    component: 'Windows Server 2019',
    version: 'Security Update KB5031361',
    releaseDate: '2023-12-12',
    status: 'pending',
    size: '435 MB',
    priority: 'critical',
    description: 'Critical security update for Windows Server'
  },
  {
    id: 2,
    component: 'Anti-Virus Software',
    version: 'v12.4.567',
    releaseDate: '2023-12-10',
    status: 'installed',
    size: '125 MB',
    priority: 'high',
    description: 'Update to antivirus definitions and scanning engine'
  },
  {
    id: 3,
    component: 'Network Monitoring Tool',
    version: 'v3.2.1',
    releaseDate: '2023-12-08',
    status: 'pending',
    size: '78 MB',
    priority: 'medium',
    description: 'Feature updates and security enhancements'
  },
  {
    id: 4,
    component: 'Database Server',
    version: 'Security Patch 2023-4',
    releaseDate: '2023-12-05',
    status: 'downloading',
    size: '210 MB',
    priority: 'high',
    description: 'Critical security patch for known vulnerabilities'
  }
];

// Mock system status metrics
const systemStatusMetrics = {
  firewallStatus: 'active',
  antivirusStatus: 'active',
  encryptionStatus: 'active',
  backupStatus: 'active',
  patchLevel: 92,
  vulnerabilities: {
    critical: 1,
    high: 2,
    medium: 1,
    low: 1
  },
  lastFullScan: '2023-12-16 03:45 AM',
  nextScheduledScan: '2023-12-23 02:00 AM'
};

const SystemSecurity = () => {
  const [isScanning, setIsScanning] = useState(false);
  
  const startScan = () => {
    setIsScanning(true);
    toast.info('System security scan initiated', {
      description: 'Full system scan will take approximately 30-45 minutes to complete.'
    });
    
    // Simulate scan completion
    setTimeout(() => {
      setIsScanning(false);
      toast.success('System scan completed', {
        description: 'No new vulnerabilities detected. Report available in security logs.'
      });
    }, 5000);
  };
  
  const installUpdate = (id: number) => {
    toast.info('Update installation initiated', {
      description: `Installing update for component ID ${id}`
    });
  };
  
  const mitigateVulnerability = (id: number) => {
    toast.info('Mitigation process started', {
      description: `Security team has been alerted about vulnerability ID ${id}`
    });
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'installed':
      case 'mitigated':
        return 'text-green-500';
      case 'pending':
      case 'downloading':
      case 'patching':
        return 'text-yellow-500';
      case 'open':
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'installed':
      case 'mitigated':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
      case 'downloading':
      case 'patching':
        return <RefreshCw className="h-4 w-4" />;
      case 'open':
      case 'failed':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  return (
    <DashboardLayout title="System Security & Vulnerabilities">
      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-mediguard-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Security Systems</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-mediguard-600" />
                <span className="text-sm">Firewall</span>
              </div>
              <div className={`flex items-center ${getStatusColor(systemStatusMetrics.firewallStatus)}`}>
                {getStatusIcon(systemStatusMetrics.firewallStatus)}
                <span className="ml-1 text-sm capitalize">{systemStatusMetrics.firewallStatus}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-mediguard-600" />
                <span className="text-sm">Antivirus</span>
              </div>
              <div className={`flex items-center ${getStatusColor(systemStatusMetrics.antivirusStatus)}`}>
                {getStatusIcon(systemStatusMetrics.antivirusStatus)}
                <span className="ml-1 text-sm capitalize">{systemStatusMetrics.antivirusStatus}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Lock className="h-4 w-4 mr-2 text-mediguard-600" />
                <span className="text-sm">Encryption</span>
              </div>
              <div className={`flex items-center ${getStatusColor(systemStatusMetrics.encryptionStatus)}`}>
                {getStatusIcon(systemStatusMetrics.encryptionStatus)}
                <span className="ml-1 text-sm capitalize">{systemStatusMetrics.encryptionStatus}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Server className="h-4 w-4 mr-2 text-mediguard-600" />
                <span className="text-sm">Backup System</span>
              </div>
              <div className={`flex items-center ${getStatusColor(systemStatusMetrics.backupStatus)}`}>
                {getStatusIcon(systemStatusMetrics.backupStatus)}
                <span className="ml-1 text-sm capitalize">{systemStatusMetrics.backupStatus}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-mediguard-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Patch Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-full pt-4">
                <div className="flex justify-center text-3xl font-bold mb-2">
                  {systemStatusMetrics.patchLevel}%
                </div>
                <CustomProgress 
                  value={systemStatusMetrics.patchLevel} 
                  className="h-3"
                  indicatorClassName={
                    systemStatusMetrics.patchLevel > 90
                      ? 'bg-green-500'
                      : systemStatusMetrics.patchLevel > 70
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }
                />
              </div>
              
              <div className="w-full flex justify-between mt-2 text-xs text-muted-foreground">
                <span>0%</span>
                <span>Updates Available: {systemUpdatesData.filter(u => u.status === 'pending').length}</span>
                <span>100%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-mediguard-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Vulnerabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col items-center p-2 rounded-md bg-red-50 dark:bg-red-900/10">
                <span className="text-2xl font-bold text-red-500">{systemStatusMetrics.vulnerabilities.critical}</span>
                <span className="text-xs text-muted-foreground">Critical</span>
              </div>
              
              <div className="flex flex-col items-center p-2 rounded-md bg-orange-50 dark:bg-orange-900/10">
                <span className="text-2xl font-bold text-orange-500">{systemStatusMetrics.vulnerabilities.high}</span>
                <span className="text-xs text-muted-foreground">High</span>
              </div>
              
              <div className="flex flex-col items-center p-2 rounded-md bg-yellow-50 dark:bg-yellow-900/10">
                <span className="text-2xl font-bold text-yellow-500">{systemStatusMetrics.vulnerabilities.medium}</span>
                <span className="text-xs text-muted-foreground">Medium</span>
              </div>
              
              <div className="flex flex-col items-center p-2 rounded-md bg-green-50 dark:bg-green-900/10">
                <span className="text-2xl font-bold text-green-500">{systemStatusMetrics.vulnerabilities.low}</span>
                <span className="text-xs text-muted-foreground">Low</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-mediguard-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Security Scan Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <div className="text-xs text-muted-foreground">Last Full Scan:</div>
              <div className="text-sm">{systemStatusMetrics.lastFullScan}</div>
            </div>
            
            <div>
              <div className="text-xs text-muted-foreground">Next Scheduled Scan:</div>
              <div className="text-sm">{systemStatusMetrics.nextScheduledScan}</div>
            </div>
            
            <Button 
              onClick={startScan} 
              disabled={isScanning}
              className="w-full mt-2"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Start Scan Now
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Vulnerabilities */}
      <Card className="mt-6 border-mediguard-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-mediguard-600" />
            System Vulnerabilities
          </CardTitle>
          <CardDescription>
            Known security vulnerabilities that need to be addressed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vulnerability</TableHead>
                  <TableHead>Component</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Discovered</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vulnerabilitiesData.map((vuln) => (
                  <TableRow key={vuln.id}>
                    <TableCell className="font-medium">
                      {vuln.name}
                      <div className="text-xs text-muted-foreground mt-1 hidden md:block lg:hidden">
                        Status: <span className={getStatusColor(vuln.status)}>{vuln.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>{vuln.component}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(vuln.severity)}`}>
                        {vuln.severity}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className={`capitalize ${getStatusColor(vuln.status)}`}>
                        {vuln.status}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{vuln.discoveredDate}</TableCell>
                    <TableCell>
                      {vuln.status !== 'mitigated' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8"
                          onClick={() => mitigateVulnerability(vuln.id)}
                        >
                          {vuln.status === 'patching' ? 'View Progress' : 'Mitigate'}
                        </Button>
                      )}
                      
                      {vuln.status === 'mitigated' && (
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                          Resolved
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
      
      {/* System Updates */}
      <Card className="mt-6 border-mediguard-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="h-5 w-5 mr-2 text-mediguard-600" />
            Available System Updates
          </CardTitle>
          <CardDescription>
            Security updates and patches for hospital systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Component</TableHead>
                  <TableHead className="hidden md:table-cell">Version</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="hidden lg:table-cell">Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {systemUpdatesData.map((update) => (
                  <TableRow key={update.id}>
                    <TableCell className="font-medium">
                      {update.component}
                      <div className="text-xs text-muted-foreground mt-1 md:hidden">
                        {update.version}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{update.version}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(update.priority)}`}>
                        {update.priority}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{update.size}</TableCell>
                    <TableCell>
                      <div className={`flex items-center ${getStatusColor(update.status)}`}>
                        {update.status === 'downloading' && (
                          <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                        )}
                        <span className="capitalize">{update.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {update.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8"
                          onClick={() => installUpdate(update.id)}
                        >
                          Install
                        </Button>
                      )}
                      
                      {update.status === 'downloading' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8"
                          disabled
                        >
                          Downloading...
                        </Button>
                      )}
                      
                      {update.status === 'installed' && (
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                          Up to date
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

export default SystemSecurity;
