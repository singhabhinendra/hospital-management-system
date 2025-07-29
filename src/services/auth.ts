import apiClient from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'lab_technician' | 'pharmacist' | 'accountant';
  department?: string;
  position?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  department?: string;
  employeeId?: string;
  permissions: Array<{
    module: string;
    actions: string[];
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    
    if (response.success && response.data.token) {
      apiClient.setToken(response.data.token);
    }
    
    return response.data;
  }

  // Register user
  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', userData);
    
    if (response.success && response.data.token) {
      apiClient.setToken(response.data.token);
    }
    
    return response.data;
  }

  // Get current user profile
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<{ user: User }>>('/auth/me');
    return response.data.user;
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      apiClient.removeToken();
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!apiClient.getToken();
  }

  // Get stored token
  getToken(): string | null {
    return apiClient.getToken();
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService;
