
import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Lock, Shield, Users, Database, EyeOff, Save, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import DashboardLayout from '@/components/DashboardLayout';

const Settings = () => {
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    securityAlerts: true,
    userActivities: true,
    systemUpdates: true,
    loginAttempts: true,
    dataAccess: false
  });
  
  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    autoLogout: true,
    passwordExpiry: true,
    passwordComplexity: 'high',
    autoUpdateSecurity: true,
    faceRecognition: true
  });
  
  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    anonymizeUserData: false,
    reducedDataCollection: false,
    enhancedPrivacyMode: false
  });
  
  // Audit settings
  const [auditSettings, setAuditSettings] = useState({
    extendedActivityLogs: true,
    fileAccessAuditing: true,
    loginAuditing: true,
    commandAuditing: false,
    retentionPeriod: '90days'
  });
  
  const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  const handleSecurityChange = (setting: keyof typeof securitySettings) => {
    if (typeof securitySettings[setting] === 'boolean') {
      setSecuritySettings(prev => ({
        ...prev,
        [setting]: !prev[setting]
      }));
    }
  };
  
  const handlePrivacyChange = (setting: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  const handleAuditChange = (setting: keyof typeof auditSettings) => {
    if (typeof auditSettings[setting] === 'boolean') {
      setAuditSettings(prev => ({
        ...prev,
        [setting]: !prev[setting]
      }));
    }
  };
  
  const saveSettings = () => {
    toast.success('Settings saved successfully', {
      description: 'Your security configuration has been updated.'
    });
  };
  
  return (
    <DashboardLayout title="Security Settings">
      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center">
            <EyeOff className="h-4 w-4 mr-2" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="auditing" className="flex items-center">
            <Database className="h-4 w-4 mr-2" />
            Auditing
          </TabsTrigger>
        </TabsList>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage your security alert preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Security Alerts</div>
                    <div className="text-xs text-muted-foreground">
                      Receive notifications about security incidents and threats
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.securityAlerts}
                    onCheckedChange={() => handleNotificationChange('securityAlerts')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">User Activities</div>
                    <div className="text-xs text-muted-foreground">
                      Notifications for suspicious user activities and behaviors
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.userActivities}
                    onCheckedChange={() => handleNotificationChange('userActivities')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">System Updates</div>
                    <div className="text-xs text-muted-foreground">
                      Notifications about available security patches and updates
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={() => handleNotificationChange('systemUpdates')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Login Attempts</div>
                    <div className="text-xs text-muted-foreground">
                      Notifications for failed login attempts and new device logins
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.loginAttempts}
                    onCheckedChange={() => handleNotificationChange('loginAttempts')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Data Access Events</div>
                    <div className="text-xs text-muted-foreground">
                      Notifications when sensitive data is accessed or modified
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.dataAccess}
                    onCheckedChange={() => handleNotificationChange('dataAccess')}
                  />
                </div>
              </div>
              
              <Button onClick={saveSettings} className="flex items-center w-full sm:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure system security features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-xs text-muted-foreground">
                      Require additional verification during login
                    </div>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={() => handleSecurityChange('twoFactorAuth')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Automatic Logout</div>
                    <div className="text-xs text-muted-foreground">
                      Automatically logout inactive sessions after 15 minutes
                    </div>
                  </div>
                  <Switch
                    checked={securitySettings.autoLogout}
                    onCheckedChange={() => handleSecurityChange('autoLogout')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Password Expiry</div>
                    <div className="text-xs text-muted-foreground">
                      Force password change every 90 days
                    </div>
                  </div>
                  <Switch
                    checked={securitySettings.passwordExpiry}
                    onCheckedChange={() => handleSecurityChange('passwordExpiry')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Automatic Security Updates</div>
                    <div className="text-xs text-muted-foreground">
                      Automatically install critical security updates
                    </div>
                  </div>
                  <Switch
                    checked={securitySettings.autoUpdateSecurity}
                    onCheckedChange={() => handleSecurityChange('autoUpdateSecurity')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Facial Recognition</div>
                    <div className="text-xs text-muted-foreground">
                      Enable biometric authentication for sensitive operations
                    </div>
                  </div>
                  <Switch
                    checked={securitySettings.faceRecognition}
                    onCheckedChange={() => handleSecurityChange('faceRecognition')}
                  />
                </div>
              </div>
              
              <Button onClick={saveSettings} className="flex items-center w-full sm:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Privacy Tab */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Configure system privacy and data handling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Anonymize User Data in Logs</div>
                    <div className="text-xs text-muted-foreground">
                      Replace usernames with anonymous identifiers in system logs
                    </div>
                  </div>
                  <Switch
                    checked={privacySettings.anonymizeUserData}
                    onCheckedChange={() => handlePrivacyChange('anonymizeUserData')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Reduced Data Collection</div>
                    <div className="text-xs text-muted-foreground">
                      Minimize the amount of user data collected for security analysis
                    </div>
                  </div>
                  <Switch
                    checked={privacySettings.reducedDataCollection}
                    onCheckedChange={() => handlePrivacyChange('reducedDataCollection')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Enhanced Privacy Mode</div>
                    <div className="text-xs text-muted-foreground">
                      Apply stricter privacy controls to all security operations
                    </div>
                  </div>
                  <Switch
                    checked={privacySettings.enhancedPrivacyMode}
                    onCheckedChange={() => handlePrivacyChange('enhancedPrivacyMode')}
                  />
                </div>
                
                <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800/30">
                  <div className="flex">
                    <Info className="h-5 w-5 text-yellow-800 dark:text-yellow-500 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-500">Privacy Notice</h3>
                      <div className="mt-1 text-xs text-yellow-700 dark:text-yellow-400">
                        <p>
                          Enhanced privacy settings may reduce the effectiveness of some security features.
                          It is recommended to maintain a balance between privacy and security for optimal protection.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button onClick={saveSettings} className="flex items-center w-full sm:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Privacy Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Auditing Tab */}
        <TabsContent value="auditing">
          <Card>
            <CardHeader>
              <CardTitle>Audit Settings</CardTitle>
              <CardDescription>Configure logging and audit trail features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Extended Activity Logging</div>
                    <div className="text-xs text-muted-foreground">
                      Capture detailed information about all system activities
                    </div>
                  </div>
                  <Switch
                    checked={auditSettings.extendedActivityLogs}
                    onCheckedChange={() => handleAuditChange('extendedActivityLogs')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">File Access Auditing</div>
                    <div className="text-xs text-muted-foreground">
                      Log all file access events in the system
                    </div>
                  </div>
                  <Switch
                    checked={auditSettings.fileAccessAuditing}
                    onCheckedChange={() => handleAuditChange('fileAccessAuditing')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Login Auditing</div>
                    <div className="text-xs text-muted-foreground">
                      Track all login attempts, successful and failed
                    </div>
                  </div>
                  <Switch
                    checked={auditSettings.loginAuditing}
                    onCheckedChange={() => handleAuditChange('loginAuditing')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Command Auditing</div>
                    <div className="text-xs text-muted-foreground">
                      Log all commands executed in the system
                    </div>
                  </div>
                  <Switch
                    checked={auditSettings.commandAuditing}
                    onCheckedChange={() => handleAuditChange('commandAuditing')}
                  />
                </div>
                
                <div className="rounded-md bg-blue-50 p-4 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/30">
                  <div className="flex">
                    <Info className="h-5 w-5 text-blue-800 dark:text-blue-500 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-500">Audit Log Retention</h3>
                      <div className="mt-1 text-xs text-blue-700 dark:text-blue-400">
                        <p>
                          Current audit log retention period: 90 days. 
                          Extended logging can increase storage requirements significantly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button onClick={saveSettings} className="flex items-center w-full sm:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Audit Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
