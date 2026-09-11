import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Notification } from '../types';
import { MOCK_NOTIFICATIONS } from '../data/users';

interface NotificationsContextValue {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (n: Omit<Notification, 'id' | 'createdAt'>) => void;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const addNotification = useCallback((n: Omit<Notification, 'id' | 'createdAt'>) => {
    const newN: Notification = {
      ...n,
      id: 'n-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newN, ...prev]);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <NotificationsContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error('useNotifications must be used inside NotificationsProvider');
  return ctx;
}

