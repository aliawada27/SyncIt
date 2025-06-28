// =============================================================================
// TASKS TYPES
// =============================================================================

import { User } from './auth';
import { Event } from './events';

export interface Task {
  id: string;
  eventId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo?: string;
  createdBy: string;
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
  position: number; // Pour l'ordre dans le Kanban
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  event: Event;
  assignee?: User;
  creator: User;
  comments: TaskComment[];
  attachments: TaskAttachment[];
}

export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  user: User;
  task: Task;
}

export interface TaskAttachment {
  id: string;
  taskId: string;
  fileName: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  url: string;
  uploadedBy: string;
  createdAt: Date;
  
  // Relations
  task: Task;
  uploader: User;
}

export interface CreateTaskRequest {
  eventId: string;
  title: string;
  description?: string;
  priority?: TaskPriority;
  assignedTo?: string;
  dueDate?: Date;
  estimatedHours?: number;
  tags?: string[];
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedTo?: string;
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  tags?: string[];
  position?: number;
}

export interface MoveTaskRequest {
  taskId: string;
  newStatus: TaskStatus;
  newPosition: number;
}

export interface CreateTaskCommentRequest {
  taskId: string;
  content: string;
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  DONE = 'done'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

// GraphQL specific types
export interface TaskFilters {
  eventId?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedTo?: string;
  createdBy?: string;
  tags?: string[];
  dueDate?: {
    from?: Date;
    to?: Date;
  };
}

export interface TaskSortOptions {
  field: 'createdAt' | 'updatedAt' | 'dueDate' | 'priority' | 'position';
  direction: 'asc' | 'desc';
}

export interface PaginatedTasks {
  tasks: Task[];
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
} 