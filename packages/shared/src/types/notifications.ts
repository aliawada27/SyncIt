// =============================================================================
// NOTIFICATIONS TYPES
// =============================================================================

import { User } from './auth';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: NotificationType;
  data: NotificationData;
  isRead: boolean;
  createdAt: Date;
  readAt?: Date;
  
  // Relations
  user: User;
}

export interface NotificationData {
  eventId?: string;
  taskId?: string;
  messageId?: string;
  invitationId?: string;
  actionUrl?: string;
  imageUrl?: string;
  [key: string]: any;
}

export interface PushNotificationPayload {
  title: string;
  body: string;
  icon?: string;
  image?: string;
  badge?: string;
  sound?: string;
  data?: NotificationData;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export interface SendNotificationRequest {
  userId: string;
  title: string;
  body: string;
  type: NotificationType;
  data?: NotificationData;
  sendPush?: boolean;
  sendEmail?: boolean;
}

export interface MarkNotificationReadRequest {
  notificationId: string;
}

export interface NotificationPreferences {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  eventUpdates: boolean;
  taskAssignments: boolean;
  chatMessages: boolean;
  eventInvitations: boolean;
  taskDeadlines: boolean;
  eventReminders: boolean;
}

export enum NotificationType {
  EVENT_INVITATION = 'event_invitation',
  EVENT_UPDATE = 'event_update',
  EVENT_REMINDER = 'event_reminder',
  TASK_ASSIGNED = 'task_assigned',
  TASK_UPDATED = 'task_updated',
  TASK_DEADLINE = 'task_deadline',
  TASK_COMPLETED = 'task_completed',
  CHAT_MESSAGE = 'chat_message',
  CHAT_MENTION = 'chat_mention',
  PARTICIPANT_JOINED = 'participant_joined',
  PARTICIPANT_LEFT = 'participant_left',
  SYSTEM = 'system'
}

// Firebase Cloud Messaging
export interface FCMToken {
  id: string;
  userId: string;
  token: string;
  platform: 'web' | 'ios' | 'android';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterFCMTokenRequest {
  token: string;
  platform: 'web' | 'ios' | 'android';
}

export interface UnregisterFCMTokenRequest {
  token: string;
} 