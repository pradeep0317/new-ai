
import React from 'react';
import { Progress as OriginalProgress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface CustomProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

export function CustomProgress({ value, className, indicatorClassName, ...props }: CustomProgressProps) {
  return (
    <div className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}>
      <div 
        className={cn("h-full w-full flex-1 transition-all", indicatorClassName)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
}
