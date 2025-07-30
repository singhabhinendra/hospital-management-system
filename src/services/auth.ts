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
  private readonly DEMO_MODE = true; // Set to false when you have a real API
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_DATA_KEY = 'user_data';

  // Demo credentials for testing
  private demoCredentials = [
    { 
      email: 'admin@hospital.com', 
      password: 'admin123', 
      user: {
        id: 'admin_001',
        username: 'admin',
        email: 'admin@hospital.com',
        fullName: 'Admin User',
        role: 'admin',
        department: 'Administration',
        employeeId: 'EMP001',
        permissions: [
          { module: 'patients', actions: ['create', 'read', 'update', 'delete'] },
          { module: 'doctors', actions: ['create', 'read', 'update', 'delete'] },
          { module: 'inventory', actions: ['create', 'read', 'update', 'delete'] },
        ]
      }
    },
    { 
      email: 'doctor@hospital.com', 
      password: 'doctor123', 
      user: {
        id: 'doc_001',
        username: 'drsmith',
        email: 'doctor@hospital.com',
        fullName: 'Dr. Smith',
        role: 'doctor',
        department: 'Cardiology',
        employeeId: 'DOC001',
        permissions: [
          { module: 'patients', actions: ['create', 'read', 'update'] },
          { module: 'appointments', actions: ['create', 'read', 'update'] },
        ]
      }
    },
    { 
      email: 'nurse@hospital.com', 
      password: 'nurse123', 
      user: {
        id: 'nurse_001',
        username: 'nursejohnson',
        email: 'nurse@hospital.com',
        fullName: 'Nurse Johnson',
        role: 'nurse',
        department: 'General Ward',
        employeeId: 'NUR001',
        permissions: [
          { module: 'patients', actions: ['read', 'update'] },
          { module: 'inventory', actions: ['read'] },
        ]
      }
    },
    { 
      email: 'demo@demo.com', 
      password: 'demo', 
      user: {
        id: 'demo_001',
        username: 'demo',
        email: 'demo@demo.com',
        fullName: 'Demo User',
        role: 'admin',
        department: 'Demo',
        employeeId: 'DEMO001',
        permissions: [
          { module: 'patients', actions: ['create', 'read', 'update', 'delete'] },
          { module: 'doctors', actions: ['create', 'read', 'update', 'delete'] },
        ]
      }
    }
  ];

  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (this.DEMO_MODE) {
      return this.demoLogin(credentials);
    }

    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
      
      if (response.success && response.data.token) {
        apiClient.setToken(response.data.token);
        this.storeAuthData(response.data);
      }
      
      return response.data;
    } catch (error) {
      // Fallback to demo login if API fails
      console.log('API login failed, falling back to demo mode');
      return this.demoLogin(credentials);
    }
  }

  // Demo login implementation
  private async demoLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const demoUser = this.demoCredentials.find(
      cred => cred.email.toLowerCase() === credentials.email.toLowerCase() && 
              cred.password === credentials.password
    );

    if (demoUser) {
      const authData = {
        user: demoUser.user,
        token: 'demo_token_' + Date.now()
      };

      this.storeAuthData(authData);
      return authData;
    } else if (credentials.email && credentials.password) {
      // Allow any email/password for demo
      const authData = {
        user: {
          id: 'demo_' + Date.now(),
          username: credentials.email.split('@')[0] || 'demo',
          email: credentials.email,
          fullName: credentials.email.split('@')[0] || 'Demo User',
          role: 'demo',
          department: 'Demo Department',
          employeeId: 'DEMO' + Date.now(),
          permissions: [
            { module: 'patients', actions: ['read', 'update'] },
            { module: 'dashboard', actions: ['read'] },
          ]
        },
        token: 'demo_token_' + Date.now()
      };

      this.storeAuthData(authData);
      return authData;
    }

    throw new Error('Invalid credentials');
  }

  // Store authentication data in localStorage
  private storeAuthData(authData: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authData.token);
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(authData.user));
    
    // Also store in your existing format for compatibility
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', authData.user.role);
    localStorage.setItem('userEmail', authData.user.email);
    localStorage.setItem('userName', authData.user.fullName);
  }

  // Register user
  async register(userData: RegisterData): Promise<AuthResponse> {
    if (this.DEMO_MODE) {
      return this.demoRegister(userData);
    }

    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', userData);
      
      if (response.success && response.data.token) {
        apiClient.setToken(response.data.token);
        this.storeAuthData(response.data);
      }
      
      return response.data;
    } catch (error) {
      // Fallback to demo register if API fails
      console.log('API register failed, falling back to demo mode');
      return this.demoRegister(userData);
    }
  }

  // Demo register implementation
  private async demoRegister(userData: RegisterData): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const authData = {
      user: {
        id: 'user_' + Date.now(),
        username: userData.username,
        email: userData.email,
        fullName: `${userData.firstName} ${userData.lastName}`,
        role: userData.role,
        department: userData.department || 'General',
        employeeId: 'EMP' + Date.now(),
        permissions: [
          { module: 'patients', actions: ['read'] },
          { module: 'dashboard', actions: ['read'] },
        ]
      },
      token: 'demo_token_' + Date.now()
    };

    this.storeAuthData(authData);
    return authData;
  }

  // Get current user profile
  async getCurrentUser(): Promise<User> {
    if (this.DEMO_MODE) {
      return this.getDemoCurrentUser();
    }

    try {
      const response = await apiClient.get<ApiResponse<{ user: User }>>('/auth/me');
      return response.data.user;
    } catch (error) {
      // Fallback to demo mode
      return this.getDemoCurrentUser();
    }
  }

  // Get current user from localStorage (demo mode)
  private getDemoCurrentUser(): User {
    const userData = localStorage.getItem(this.USER_DATA_KEY);
    
    if (userData) {
      return JSON.parse(userData);
    }

    // Fallback to your existing localStorage format
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    if (isLoggedIn === 'true' && userEmail && userName) {
      const user: User = {
        id: userEmail,
        username: userEmail.split('@')[0] || 'user',
        email: userEmail,
        fullName: userName,
        role: userRole || 'user',
        department: 'General',
        employeeId: 'EMP' + Date.now(),
        permissions: [
          { module: 'patients', actions: ['read'] },
          { module: 'dashboard', actions: ['read'] },
        ]
      };

      // Cache it in the new format
      localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(user));
      
      return user;
    }

    throw new Error('No authenticated user found');
  }

  // Logout user
  async logout(): Promise<void> {
    if (!this.DEMO_MODE) {
      try {
        await apiClient.post('/auth/logout');
      } finally {
        apiClient.removeToken();
      }
    }

    // Clear all stored data
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_DATA_KEY);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    
    const token = localStorage.getItem(this.TOKEN_KEY);
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (this.DEMO_MODE) {
      return !!(token || isLoggedIn === 'true');
    }

    return !!apiClient.getToken();
  }

  // Get stored token
  getToken(): string | null {
    if (this.DEMO_MODE) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    
    return apiClient.getToken();
  }

  // Switch between demo and API mode
  setDemoMode(enabled: boolean): void {
    (this as any).DEMO_MODE = enabled;
  }

  // Get demo credentials for testing
  getDemoCredentials() {
    return this.demoCredentials.map(({ email, password, user }) => ({
      email,
      password,
      role: user.role,
      name: user.fullName
    }));
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService;