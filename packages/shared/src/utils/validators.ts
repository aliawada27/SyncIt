// =============================================================================
// VALIDATORS
// =============================================================================

import {
  MAX_EVENT_TITLE_LENGTH,
  MAX_EVENT_DESCRIPTION_LENGTH,
  MAX_TASK_TITLE_LENGTH,
  MAX_TASK_DESCRIPTION_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
  INVITE_CODE_LENGTH
} from './constants';

export const validators = {
  // Email validation
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Password validation (minimum 8 characters, at least one letter and one number)
  password: (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  },

  // Name validation (2-50 characters, letters and spaces only)
  name: (name: string): boolean => {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
    return nameRegex.test(name.trim());
  },

  // Event title validation
  eventTitle: (title: string): boolean => {
    return title.trim().length > 0 && title.trim().length <= MAX_EVENT_TITLE_LENGTH;
  },

  // Event description validation
  eventDescription: (description: string): boolean => {
    return description.length <= MAX_EVENT_DESCRIPTION_LENGTH;
  },

  // Task title validation
  taskTitle: (title: string): boolean => {
    return title.trim().length > 0 && title.trim().length <= MAX_TASK_TITLE_LENGTH;
  },

  // Task description validation
  taskDescription: (description: string): boolean => {
    return description.length <= MAX_TASK_DESCRIPTION_LENGTH;
  },

  // Message content validation
  messageContent: (content: string): boolean => {
    return content.trim().length > 0 && content.trim().length <= MAX_MESSAGE_LENGTH;
  },

  // Invite code validation
  inviteCode: (code: string): boolean => {
    const codeRegex = new RegExp(`^[A-Z0-9]{${INVITE_CODE_LENGTH}}$`);
    return codeRegex.test(code);
  },

  // URL validation
  url: (url: string): boolean => {
    const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    return urlRegex.test(url);
  },

  // File validation
  file: (file: { size: number; type: string }): { valid: boolean; error?: string } => {
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`
      };
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: 'File type not allowed'
      };
    }

    return { valid: true };
  },

  // Date validation (not in the past)
  futureDate: (date: Date): boolean => {
    return date.getTime() > Date.now();
  },

  // Date range validation (end date after start date)
  dateRange: (startDate: Date, endDate: Date): boolean => {
    return endDate.getTime() > startDate.getTime();
  },

  // UUID validation
  uuid: (id: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  },

  // Tag validation
  tag: (tag: string): boolean => {
    const tagRegex = /^[a-zA-Z0-9\-_]{1,20}$/;
    return tagRegex.test(tag);
  },

  // Phone number validation (basic international format)
  phoneNumber: (phone: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }
};

// Error messages
export const validationMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must be at least 8 characters with at least one letter and one number',
  name: 'Name must be 2-50 characters and contain only letters and spaces',
  eventTitle: `Event title must be 1-${MAX_EVENT_TITLE_LENGTH} characters`,
  eventDescription: `Event description must be less than ${MAX_EVENT_DESCRIPTION_LENGTH} characters`,
  taskTitle: `Task title must be 1-${MAX_TASK_TITLE_LENGTH} characters`,
  taskDescription: `Task description must be less than ${MAX_TASK_DESCRIPTION_LENGTH} characters`,
  messageContent: `Message must be 1-${MAX_MESSAGE_LENGTH} characters`,
  inviteCode: `Invite code must be ${INVITE_CODE_LENGTH} characters`,
  url: 'Please enter a valid URL',
  file: 'Invalid file',
  futureDate: 'Date must be in the future',
  dateRange: 'End date must be after start date',
  uuid: 'Invalid ID format',
  tag: 'Tag must be 1-20 characters and contain only letters, numbers, hyphens, and underscores',
  phoneNumber: 'Please enter a valid phone number'
};

// Helper function to validate an object against multiple validators
export const validateObject = <T extends Record<string, any>>(
  obj: T,
  rules: Record<keyof T, (value: any) => boolean>
): { valid: boolean; errors: Record<keyof T, string> } => {
  const errors: Record<keyof T, string> = {} as Record<keyof T, string>;
  let valid = true;

  for (const [field, validator] of Object.entries(rules)) {
    if (!validator(obj[field])) {
      valid = false;
      errors[field as keyof T] = validationMessages[field as keyof typeof validationMessages] || `Invalid ${field}`;
    }
  }

  return { valid, errors };
}; 