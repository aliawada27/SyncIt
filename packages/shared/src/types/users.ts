// =============================================================================
// USERS TYPES
// =============================================================================

import { User } from './auth';

export interface UserProfile extends User {
  bio?: string;
  timezone?: string;
  language?: string;
  dateFormat?: string;
  timeFormat?: string;
  isOnline: boolean;
  lastSeenAt?: Date;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  bio?: string;
  timezone?: string;
  language?: string;
  dateFormat?: string;
  timeFormat?: string;
}

export interface UploadAvatarRequest {
  file: FileUpload;
}

export interface FileUpload {
  name: string;
  size: number;
  type: string;
  data: ArrayBuffer | string;
}

export interface UserStats {
  userId: string;
  totalEvents: number;
  totalTasks: number;
  completedTasks: number;
  totalMessages: number;
  joinedAt: Date;
}

export interface UserActivity {
  id: string;
  userId: string;
  type: ActivityType;
  description: string;
  entityId?: string;
  entityType?: string;
  createdAt: Date;
  
  // Relations
  user: User;
}

export enum ActivityType {
  EVENT_CREATED = 'event_created',
  EVENT_JOINED = 'event_joined',
  EVENT_LEFT = 'event_left',
  TASK_CREATED = 'task_created',
  TASK_ASSIGNED = 'task_assigned',
  TASK_COMPLETED = 'task_completed',
  MESSAGE_SENT = 'message_sent',
  PROFILE_UPDATED = 'profile_updated'
}

export interface SearchUsersRequest {
  query: string;
  limit?: number;
  eventId?: string; // Pour exclure les utilisateurs déjà dans l'événement
}

export interface SearchUsersResponse {
  users: User[];
  total: number;
} 