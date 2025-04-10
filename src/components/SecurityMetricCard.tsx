
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SecurityMetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  footer?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: 'success' | 'warning' | 'danger' | 'neutral';
  onClick?: () => void;
  className?: string;
}

const SecurityMetricCard: React.FC<SecurityMetricCardProps> = ({
  title,
  value,
  icon,
  description,
  footer,
  trend,
  status = 'neutral',
  onClick,
  className
}) => {
  const statusColors = {
    success: 'border-green-200 bg-green-50 dark:bg-green-900/20',
    warning: 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20',
    danger: 'border-red-200 bg-red-50 dark:bg-red-900/20',
    neutral: 'border-border bg-card'
  };
  
  const iconColors = {
    success: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-red-500',
    neutral: 'text-primary'
  };
  
  const trendColors = {
    positive: 'text-green-500',
    negative: 'text-red-500'
  };

  return (
    <Card 
      className={cn(
        'transition-all duration-200 overflow-hidden',
        onClick ? 'cursor-pointer hover:shadow-md' : '',
        statusColors[status],
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn('p-2 rounded-full', iconColors[status])}>{icon}</div>
      </CardHeader>
      
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <CardDescription className="mt-1 text-xs">{description}</CardDescription>}
        
        {trend && (
          <div className={cn(
            'flex items-center mt-2 text-xs font-medium',
            trend.isPositive ? trendColors.positive : trendColors.negative
          )}>
            <span className="mr-1">
              {trend.isPositive ? '↑' : '↓'}
            </span>
            {trend.value}%
            <span className="ml-1 text-muted-foreground">
              from last week
            </span>
          </div>
        )}
      </CardContent>
      
      {footer && <CardFooter className="pt-0">{footer}</CardFooter>}
    </Card>
  );
};

export default SecurityMetricCard;
