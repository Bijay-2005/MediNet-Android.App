import { useState, useEffect } from 'react';
import { useNotification } from './useNotification';

export interface ReminderData {
  id: string;
  medicationName: string;
  dosage: string;
  time: string;
  frequency: string;
  isActive: boolean;
  nextReminder?: Date;
}

export const useReminder = () => {
  const [reminders, setReminders] = useState<ReminderData[]>([]);
  const [activeTimers, setActiveTimers] = useState<Map<string, NodeJS.Timeout>>(new Map());
  const { addNotification } = useNotification();

  const addReminder = (reminder: Omit<ReminderData, 'id' | 'nextReminder'>) => {
    const newReminder: ReminderData = {
      ...reminder,
      id: Date.now().toString(),
      nextReminder: calculateNextReminder(reminder.time),
    };
    
    setReminders(prev => [...prev, newReminder]);
    
    if (newReminder.isActive) {
      scheduleReminder(newReminder);
    }
  };

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(reminder => {
      if (reminder.id === id) {
        const updated = { ...reminder, isActive: !reminder.isActive };
        
        if (updated.isActive) {
          scheduleReminder(updated);
        } else {
          cancelReminder(id);
        }
        
        return updated;
      }
      return reminder;
    }));
  };

  const removeReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
    cancelReminder(id);
  };

  const calculateNextReminder = (time: string): Date => {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    const reminder = new Date();
    
    reminder.setHours(hours, minutes, 0, 0);
    
    if (reminder <= now) {
      reminder.setDate(reminder.getDate() + 1);
    }
    
    return reminder;
  };

  const scheduleReminder = (reminder: ReminderData) => {
    const now = new Date();
    const reminderTime = reminder.nextReminder || calculateNextReminder(reminder.time);
    const delay = reminderTime.getTime() - now.getTime();
    
    if (delay > 0) {
      const timer = setTimeout(() => {
        addNotification({
          type: 'medication',
          title: `Time for ${reminder.medicationName}`,
          message: `Take ${reminder.dosage} as prescribed`,
          medicationName: reminder.medicationName,
          dosage: reminder.dosage,
        });
        
        // Schedule next reminder based on frequency
        if (reminder.frequency === 'daily') {
          const nextReminder = new Date(reminderTime);
          nextReminder.setDate(nextReminder.getDate() + 1);
          setReminders(prev => prev.map(r => 
            r.id === reminder.id ? { ...r, nextReminder } : r
          ));
          scheduleReminder({ ...reminder, nextReminder });
        }
      }, delay);
      
      setActiveTimers(prev => new Map(prev).set(reminder.id, timer));
    }
  };

  const cancelReminder = (id: string) => {
    const timer = activeTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      setActiveTimers(prev => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
    }
  };

  useEffect(() => {
    // Schedule active reminders on mount
    reminders.forEach(reminder => {
      if (reminder.isActive) {
        scheduleReminder(reminder);
      }
    });

    // Cleanup on unmount
    return () => {
      activeTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return {
    reminders,
    addReminder,
    toggleReminder,
    removeReminder,
  };
};