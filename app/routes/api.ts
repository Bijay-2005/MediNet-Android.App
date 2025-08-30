// API functions for authentication
const API_BASE_URL = 'http://localhost:3001/server'; // Update this to match your server URL

export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      console.log('API: Attempting login for:', email);
      console.log('API: Server URL:', API_BASE_URL);
      
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      console.log('API: Login response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 0 || response.status === 500) {
          console.error('API: Server connection failed. Is the server running?');
          return { 
            success: false, 
            message: 'Server connection failed. Please ensure the server is running on port 3001.',
            errorType: 'SERVER_ERROR'
          };
        }
      }
      
      const data = await response.json();
      console.log('API: Login response data:', data);
      
      if (response.ok && data.success) {
        // Store token and user data
        localStorage.setItem('authToken', data.jwtToken);
        localStorage.setItem('user', JSON.stringify({
          email: data.email,
          name: data.name,
          id: data._id
        }));
        console.log('API: Login successful, token stored');
        return { success: true, user: data, token: data.jwtToken };
      } else {
        console.log('API: Login failed:', data.message);
        return { 
          success: false, 
          message: data.message || 'Login failed',
          errorType: data.errorType
        };
      }
    } catch (error) {
      console.error('API: Login network error:', error);
      
      // Check if it's a connection error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return { 
          success: false, 
          message: 'Cannot connect to server. Please ensure the server is running on port 3001.',
          errorType: 'CONNECTION_ERROR'
        };
      }
      
      return { 
        success: false, 
        message: 'Network error. Please check your connection and ensure the server is running.' 
      };
    }
  },

  signup: async (name: string, email: string, password: string) => {
    try {
      console.log('API: Attempting signup for:', email);
      console.log('API: Server URL:', API_BASE_URL);
      
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      console.log('API: Signup response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 0 || response.status === 500) {
          console.error('API: Server connection failed. Is the server running?');
          return { 
            success: false, 
            message: 'Server connection failed. Please ensure the server is running on port 3001.',
            errorType: 'SERVER_ERROR'
          };
        }
      }
      
      const data = await response.json();
      console.log('API: Signup response data:', data);
      
      if (response.ok && data.success) {
        console.log('API: Signup successful');
        return { success: true, message: data.message };
      } else {
        console.log('API: Signup failed:', data.message);
        return { 
          success: false, 
          message: data.message || 'Registration failed',
          errorType: data.errorType
        };
      }
    } catch (error) {
      console.error('API: Signup network error:', error);
      
      // Check if it's a connection error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return { 
          success: false, 
          message: 'Cannot connect to server. Please ensure the server is running on port 3001.',
          errorType: 'CONNECTION_ERROR'
        };
      }
      
      return { 
        success: false, 
        message: 'Network error. Please check your connection and ensure the server is running.' 
      };
    }
  },

  // Helper function to check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  // Helper function to get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Helper function to logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Helper function to get auth token
  getAuthToken: () => {
    return localStorage.getItem('authToken');
  },

  // Test protected route
  getProfile: async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return { success: false, message: 'No token found' };
      }

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Failed to get profile' };
      }
    } catch (error) {
      console.error('Get profile error:', error);
      return { success: false, message: 'Network error' };
    }
  }
}; 