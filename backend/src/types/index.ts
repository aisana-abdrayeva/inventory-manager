// User types
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
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
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
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
    role: UserRole;
  };
}

// Request/Response types
export interface RequestWithUser extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

// Error types
export interface PrismaError {
  code: string;
  meta?: {
    target?: string[];
  };
  message: string;
}

// Inventory types
export interface Inventory {
  id: string;
  title: string;
  description?: string;
  category: string;
  tags: string[];
  ownerId: string;
  public: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryItem {
  id: string;
  inventoryId: string;
  customId: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
} 