
import React, { useState, useEffect } from 'react';
import { Usb, ShieldAlert, Check, X, RefreshCw, FilterX, AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import SecurityMetricCard from '@/components/SecurityMetricCard';
import DashboardLayout from '@/components/DashboardLayout';

// Mock USB devices data
const generateUsbDevices = () => {
  const statuses = ['authorized', 'unauthorized', 'quarantined', 'scanning'];
  const deviceTypes = ['Storage Device', 'HID Device', 'Mobile Phone', 'Camera', 'Printer', 'Unknown Device'];
  const manufacturers = ['SanDisk', 'Kingston', 'Samsung', 'Apple', 'Logitech', 'Generic'];
  const locations = ['Nurses Station', 'Dr. Office', 'Reception', 'Lab', 'Admin'];
  
  return Array.from({ length: 8 }, (_, i) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const deviceType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
    const manufacturer = manufacturers[Math.floor(Math.random() * manufacturers.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const lastConnected = Math.floor(Math.random() * 24) + 1;
    const malwareDetected = Math.random() > 0.7;
    
    return {
      id: `usb-${i + 1}`,
      deviceName: `${manufacturer} ${deviceType}`,
      serialNumber: `SN${Math.floor(Math.random() * 1000000)}`,
      status,
      location,
      user: `user${Math.floor(Math.random() * 100)}`,
      lastConnected: `${lastConnected} ${lastConnected === 1 ? 'hour' : 'hours'} ago`,
      malwareDetected,
      isEncrypted: Math.random() > 0.5
    };
  });
};

// Initial metrics
const initialMetrics = {
  authorizedDevices: Math.floor(Math.random() * 20) + 10,
  unauthorizedDevices: Math.floor(Math.random() * 5),
  malwareDetected: Math.floor(Math.random() * 3),
  scannedFiles: Math.floor(Math.random() * 500) + 100
};

const UsbMonitoring = () => {
  const [devices, setDevices] = useState(generateUsbDevices());
  const [metrics, setMetrics] = useState(initialMetrics);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  const getFilteredDevices = () => {
    if (activeTab === 'all') return devices;
    return devices.filter(device => device.status === activeTab);
  };
  
  const refreshData = () => {
    setIsRefreshing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setDevices(generateUsbDevices());
      setMetrics({
        authorizedDevices: Math.floor(Math.random() * 20) + 10,
        unauthorizedDevices: Math.floor(Math.random() * 5),
        malwareDetected: Math.floor(Math.random() * 3),
        scannedFiles: Math.floor(Math.random() * 500) + 100
      });
      setIsRefreshing(false);
      
      toast.success('USB monitoring data refreshed', {
        description: 'Latest device information has been loaded.'
      });
    }, 1500);
  };
  
  const handleBlockDevice = (deviceId: string) => {
    setDevices(prevDevices => 
      prevDevices.map(device => 
        device.id === deviceId ? { ...device, status: 'quarantined' } : device
      )
    );
    
    toast.success('Device blocked', {
      description: 'The device has been quarantined and isolated.'
    });
  };
  
  const handleAuthorizeDevice = (deviceId: string) => {
    setDevices(prevDevices => 
      prevDevices.map(device => 
        device.id === deviceId ? { ...device, status: 'authorized' } : device
      )
    );
    
    toast.success('Device authorized', {
      description: 'The device has been approved for use.'
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'authorized':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'unauthorized':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'quarantined':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'scanning':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  return (
    <DashboardLayout title="USB Device Monitoring">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SecurityMetricCard
          title="Authorized Devices"
          value={metrics.authorizedDevices}
          icon={<Check className="h-4 w-4" />}
          description="Approved and monitored USB devices"
          status="success"
        />
        
        <SecurityMetricCard
          title="Unauthorized Devices"
          value={metrics.unauthorizedDevices}
          icon={<X className="h-4 w-4" />}
          description="Unapproved USB device connections"
          status={metrics.unauthorizedDevices > 0 ? 'danger' : 'success'}
        />
        
        <SecurityMetricCard
          title="Malware Detected"
          value={metrics.malwareDetected}
          icon={<ShieldAlert className="h-4 w-4" />}
          description="Threats found on USB devices"
          status={metrics.malwareDetected > 0 ? 'danger' : 'success'}
        />
        
        <SecurityMetricCard
          title="Files Scanned"
          value={metrics.scannedFiles}
          icon={<FilterX className="h-4 w-4" />}
          description="Files checked for threats"
          status="neutral"
        />
      </div>
      
      {/* USB Monitoring Panel */}
      <Card className="mt-6 border-mediguard-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Usb className="h-5 w-5 mr-2 text-mediguard-600" />
              USB Device Control
            </CardTitle>
            <CardDescription>
              Monitor and manage all USB devices connected to the hospital network
            </CardDescription>
          </div>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="h-8 gap-1"
            onClick={refreshData}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Devices</TabsTrigger>
              <TabsTrigger value="authorized">Authorized</TabsTrigger>
              <TabsTrigger value="unauthorized">Unauthorized</TabsTrigger>
              <TabsTrigger value="quarantined">Quarantined</TabsTrigger>
              <TabsTrigger value="scanning">Scanning</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device</TableHead>
                      <TableHead className="hidden md:table-cell">Serial Number</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead className="hidden lg:table-cell">Last Connected</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredDevices().length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No devices found with the selected filter.
                        </TableCell>
                      </TableRow>
                    ) : (
                      getFilteredDevices().map((device) => (
                        <TableRow key={device.id}>
                          <TableCell className="font-medium">
                            <div>
                              {device.deviceName}
                              {device.malwareDetected && (
                                <Badge variant="destructive" className="ml-2">Malware Detected</Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              User: {device.user}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{device.serialNumber}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(device.status)}`}>
                              {device.status}
                            </span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{device.location}</TableCell>
                          <TableCell className="hidden lg:table-cell">{device.lastConnected}</TableCell>
                          <TableCell className="text-right">
                            {device.status === 'unauthorized' && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8 mr-2"
                                onClick={() => handleAuthorizeDevice(device.id)}
                              >
                                <Check className="h-3.5 w-3.5 mr-1" />
                                Authorize
                              </Button>
                            )}
                            
                            {device.status !== 'quarantined' && (
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                className="h-8"
                                onClick={() => handleBlockDevice(device.id)}
                              >
                                <X className="h-3.5 w-3.5 mr-1" />
                                Block
                              </Button>
                            )}
                            
                            {device.status === 'quarantined' && (
                              <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300">
                                Blocked
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* USB Security Policy */}
      <Card className="mt-6 border-mediguard-200 bg-muted/30">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="h-5 w-5 mr-2 text-mediguard-600" />
            USB Security Policy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
                  Automatic Protection
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  All USB devices are automatically scanned upon connection. Files with potential threats 
                  are quarantined and reported to security administrators.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium flex items-center">
                  <Check className="h-4 w-4 mr-1 text-green-500" />
                  Authorized Devices
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Only hospital-issued and approved USB devices should be used. Personal devices require 
                  security approval before use on hospital systems.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium flex items-center">
                  <X className="h-4 w-4 mr-1 text-red-500" />
                  Prohibited Activities
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Using USB devices to transfer patient data without encryption, introducing personal software,
                  or connecting to systems containing sensitive data is strictly prohibited.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium flex items-center">
                  <ShieldAlert className="h-4 w-4 mr-1 text-mediguard-600" />
                  Response Protocol
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  If an unauthorized USB device is detected, the system will automatically quarantine the device,
                  log the incident, and notify security personnel for further investigation.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default UsbMonitoring;
