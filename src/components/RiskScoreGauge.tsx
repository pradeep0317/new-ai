
import React from 'react';
import { cn } from '@/lib/utils';

interface RiskScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const RiskScoreGauge: React.FC<RiskScoreGaugeProps> = ({
  score,
  size = 'md',
  showLabel = true,
  className
}) => {
  // Convert 0-100 to rotation degrees (0-180)
  const rotation = (score / 100) * 180;
  
  // Determine color based on score
  const getColor = () => {
    if (score < 30) return 'text-green-500';
    if (score < 70) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Determine size classes
  const sizeClasses = {
    sm: 'h-24 w-24',
    md: 'h-32 w-32',
    lg: 'h-40 w-40'
  };
  
  const fontSize = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };
  
  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <div className={cn('relative', sizeClasses[size])}>
        {/* Background semi-circle */}
        <div className="absolute inset-0 rounded-full border-8 border-muted opacity-30" style={{ 
          clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)',
          borderBottomColor: 'transparent',
          transform: 'rotate(-90deg)'
        }}></div>
        
        {/* Indicator needle */}
        <div 
          className={cn('absolute bottom-0 left-1/2 -translate-x-1/2 origin-bottom transform transition-transform duration-700 ease-out', getColor())}
          style={{ 
            height: '45%', 
            width: '2px',
            backgroundColor: 'currentColor',
            transformOrigin: 'bottom center',
            transform: `rotate(${rotation - 90}deg)`
          }}
        >
          <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-current"></div>
        </div>
        
        {/* Risk score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('font-bold', fontSize[size], getColor())}>{score}</span>
          {showLabel && <span className="text-xs text-muted-foreground mt-1">Risk Score</span>}
        </div>
        
        {/* Risk level markers */}
        <div className="absolute inset-0">
          {/* Low risk */}
          <div className="absolute top-0 left-1/4 -translate-x-1/2 -translate-y-1 text-green-500 text-xs">
            Low
          </div>
          
          {/* Medium risk */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 text-yellow-500 text-xs">
            Med
          </div>
          
          {/* High risk */}
          <div className="absolute top-0 left-3/4 -translate-x-1/2 -translate-y-1 text-red-500 text-xs">
            High
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskScoreGauge;
