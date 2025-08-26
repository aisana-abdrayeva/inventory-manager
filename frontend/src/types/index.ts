// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastLogin: string;
  status: UserStatus;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export enum UserStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked'
}

// Auth types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    status: UserStatus;
    role?: UserRole;
  };
}

// API Response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  error?: string;
}

// Event types
export interface FormEvent {
  target: {
    value: string;
  };
}

export interface ChangeEvent {
  target: {
    value: string;
  };
}

// Error types
export interface ApiError {
  response?: {
    status: number;
    data: {
      error: string;
    };
  };
  message: string;
} 