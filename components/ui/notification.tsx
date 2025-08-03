import { Bell, Pill, X } from 'lucide-react';
import { Card, CardContent } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { NotificationData } from '@/app/routes/useNotification';

interface NotificationProps {
  notification: NotificationData;
  onClose: (id: string) => void;
}

export const Notification = ({ notification, onClose }: NotificationProps) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'medication':
        return <Pill className="h-5 w-5 text-health-info" />;
      case 'reminder':
        return <Bell className="h-5 w-5 text-health-warning" />;
      default:
        return <Bell className="h-5 w-5 text-health-info" />;
    }
  };

  const getTypeColor = () => {
    switch (notification.type) {
      case 'medication':
        return 'bg-health-info';
      case 'reminder':
        return 'bg-health-warning';
      default:
        return 'bg-health-info';
    }
  };

  return (
    <Card className="w-full max-w-sm bg-gradient-medical text-white shadow-health-card animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-white mb-1">{notification.title}</h4>
              <p className="text-sm text-white/90 mb-2">{notification.message}</p>
              
              {notification.medicationName && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {notification.medicationName}
                  </Badge>
                  {notification.dosage && (
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {notification.dosage}
                    </Badge>
                  )}
                </div>
              )}
              
              <p className="text-xs text-white/70 mt-2">
                {notification.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onClose(notification.id)}
            className="h-8 w-8 p-0 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};