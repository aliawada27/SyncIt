// =============================================================================
// CONSTANTS
// =============================================================================

export const APP_NAME = 'SyncIt';
export const APP_VERSION = '1.0.0';

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const ALLOWED_FILE_TYPES = [
  ...ALLOWED_IMAGE_TYPES,
  'application/pdf',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

// Events
export const INVITE_CODE_LENGTH = 8;
export const MAX_EVENT_TITLE_LENGTH = 100;
export const MAX_EVENT_DESCRIPTION_LENGTH = 1000;
export const MAX_PARTICIPANTS_PER_EVENT = 100;

// Tasks
export const MAX_TASK_TITLE_LENGTH = 100;
export const MAX_TASK_DESCRIPTION_LENGTH = 1000;
export const MAX_TAGS_PER_TASK = 10;
export const MAX_TAG_LENGTH = 20;

// Chat
export const MAX_MESSAGE_LENGTH = 2000;
export const MAX_ATTACHMENTS_PER_MESSAGE = 5;
export const TYPING_TIMEOUT = 3000; // 3 seconds

// Notifications
export const MAX_NOTIFICATION_TITLE_LENGTH = 100;
export const MAX_NOTIFICATION_BODY_LENGTH = 500;

// Rate Limiting
export const RATE_LIMITS = {
  DEFAULT: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // requests per window
  },
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5 // login attempts per window
  },
  UPLOAD: {
    windowMs: 60 * 1000, // 1 minute
    max: 10 // uploads per minute
  },
  CHAT: {
    windowMs: 60 * 1000, // 1 minute
    max: 30 // messages per minute
  }
};

// Socket.io Events
export const SOCKET_EVENTS = {
  // Connection
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  
  // Rooms
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
  
  // Messages
  SEND_MESSAGE: 'send_message',
  MESSAGE_SENT: 'message_sent',
  EDIT_MESSAGE: 'edit_message',
  MESSAGE_EDITED: 'message_edited',
  DELETE_MESSAGE: 'delete_message',
  MESSAGE_DELETED: 'message_deleted',
  
  // Reactions
  ADD_REACTION: 'add_reaction',
  REACTION_ADDED: 'reaction_added',
  REMOVE_REACTION: 'remove_reaction',
  REACTION_REMOVED: 'reaction_removed',
  
  // Typing
  TYPING_START: 'typing_start',
  TYPING_STOP: 'typing_stop',
  USER_TYPING: 'user_typing',
  USER_STOPPED_TYPING: 'user_stopped_typing',
  
  // Presence
  USER_JOINED: 'user_joined',
  USER_LEFT: 'user_left',
  
  // Errors
  ERROR: 'error'
} as const;

// Time Zones
export const DEFAULT_TIMEZONE = 'UTC';
export const SUPPORTED_TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Australia/Sydney'
];

// Languages
export const DEFAULT_LANGUAGE = 'en';
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'ja', name: '日本語' },
  { code: 'zh', name: '中文' }
];

// Date/Time Formats
export const DATE_FORMATS = [
  'DD/MM/YYYY',
  'MM/DD/YYYY',
  'YYYY-MM-DD',
  'DD-MM-YYYY',
  'MM-DD-YYYY'
];

export const TIME_FORMATS = [
  '24h',
  '12h'
]; 