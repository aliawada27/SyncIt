// =============================================================================
// CHAT TYPES
// =============================================================================

import { User } from './auth';
import { Event } from './events';

export interface ChatMessage {
  id: string;
  eventId: string;
  userId: string;
  content: string;
  type: MessageType;
  replyTo?: string;
  attachments: MessageAttachment[];
  reactions: MessageReaction[];
  isEdited: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  user: User;
  event: Event;
  replyToMessage?: ChatMessage;
}

export interface MessageAttachment {
  id: string;
  messageId: string;
  fileName: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  url: string;
  thumbnailUrl?: string;
  createdAt: Date;
}

export interface MessageReaction {
  id: string;
  messageId: string;
  userId: string;
  emoji: string;
  createdAt: Date;
  
  // Relations
  user: User;
  message: ChatMessage;
}

export interface SendMessageRequest {
  eventId: string;
  content: string;
  type?: MessageType;
  replyTo?: string;
  attachments?: FileUpload[];
}

export interface FileUpload {
  name: string;
  size: number;
  type: string;
  data: ArrayBuffer | string;
}

export interface EditMessageRequest {
  messageId: string;
  content: string;
}

export interface AddReactionRequest {
  messageId: string;
  emoji: string;
}

export interface RemoveReactionRequest {
  messageId: string;
  emoji: string;
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  SYSTEM = 'system',
  TASK_UPDATE = 'task_update',
  EVENT_UPDATE = 'event_update'
}

// Socket.io Events
export interface SocketEvents {
  // Client to Server
  join_room: (eventId: string) => void;
  leave_room: (eventId: string) => void;
  send_message: (data: SendMessageRequest) => void;
  edit_message: (data: EditMessageRequest) => void;
  delete_message: (messageId: string) => void;
  add_reaction: (data: AddReactionRequest) => void;
  remove_reaction: (data: RemoveReactionRequest) => void;
  typing_start: (eventId: string) => void;
  typing_stop: (eventId: string) => void;
  
  // Server to Client
  message_sent: (message: ChatMessage) => void;
  message_edited: (message: ChatMessage) => void;
  message_deleted: (messageId: string) => void;
  reaction_added: (reaction: MessageReaction) => void;
  reaction_removed: (reactionId: string) => void;
  user_typing: (data: { eventId: string; user: User }) => void;
  user_stopped_typing: (data: { eventId: string; user: User }) => void;
  user_joined: (data: { eventId: string; user: User }) => void;
  user_left: (data: { eventId: string; user: User }) => void;
  error: (error: { message: string; code: string }) => void;
}

export interface TypingIndicator {
  eventId: string;
  userId: string;
  isTyping: boolean;
  timestamp: Date;
}

export interface OnlineUser {
  userId: string;
  eventId: string;
  socketId: string;
  joinedAt: Date;
} 