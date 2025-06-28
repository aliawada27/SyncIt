// =============================================================================
// EVENTS TYPES
// =============================================================================

import { User } from './auth';

export interface Event {
  id: string;
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  createdBy: string;
  inviteCode: string;
  qrCode?: string;
  budget?: number;
  status: EventStatus;
  isPublic: boolean;
  maxParticipants?: number;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  creator: User;
  participants: EventParticipant[];
}

export interface EventParticipant {
  id: string;
  eventId: string;
  userId: string;
  role: ParticipantRole;
  status: ParticipantStatus;
  joinedAt: Date;
  
  // Relations
  user: User;
  event: Event;
}

export interface CreateEventRequest {
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  budget?: number;
  isPublic?: boolean;
  maxParticipants?: number;
}

export interface UpdateEventRequest {
  title?: string;
  description?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  budget?: number;
  isPublic?: boolean;
  maxParticipants?: number;
}

export interface JoinEventRequest {
  inviteCode: string;
}

export interface EventInvitation {
  id: string;
  eventId: string;
  invitedBy: string;
  invitedEmail: string;
  status: InvitationStatus;
  createdAt: Date;
  expiresAt: Date;
}

export enum EventStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum ParticipantRole {
  ORGANIZER = 'organizer',
  ADMIN = 'admin',
  PARTICIPANT = 'participant'
}

export enum ParticipantStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  LEFT = 'left'
}

export enum InvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  EXPIRED = 'expired'
}

// Calendar Integration
export interface CalendarAvailability {
  userId: string;
  eventId: string;
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
  note?: string;
}

export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
} 