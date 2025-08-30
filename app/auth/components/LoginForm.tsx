import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles, Heart, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/app/routes/auth-context';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onShowOTP: (email: string) => void;
  onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onShowOTP, onToggleForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  
  const { login } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {        
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    console.log('LoginForm: Starting login process for:', formData.email);
    
    try {
      // First, attempt regular login
      const response = await login(formData.email, formData.password);
      console.log('LoginForm: Login response:', response);
      
      if (response.success) {
        // If login is successful, proceed to OTP verification
        console.log('LoginForm: Login successful, proceeding to OTP verification');
        onShowOTP(formData.email);
      } else {
        setLoginAttempts(prev => prev + 1);
        console.log('LoginForm: Login failed, error:', response.message);
        
        if (response.message?.includes('not found') || response.message?.includes('Account not found')) {
          setError('Account not found. Please sign up first.');
          setTimeout(() => {
            onToggleForm(); // Switch to signup
          }, 2000);
        } else if (response.message?.includes('Server connection failed') || response.message?.includes('Cannot connect to server')) {
          setError('Server connection failed. Please ensure the server is running on port 3001.');
        } else {
          setError(response.message || 'Email or password is incorrect');
        }
      }
    } catch (err: any) {
      console.error('LoginForm: Error during login process:', err);
      setError(err.response?.data?.message || 'Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden z-10">
      <div className="p-6">
        {/* Form Header */}
        <div className="relative mb-6">
          <div className="text-center">
            <div className="relative inline-block">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome Back
              </h2>
              <div className="absolute -top-1 -right-6">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Sign in to access your personalized health dashboard
            </p>
            {loginAttempts > 0 && (
              <p className="text-xs text-orange-600 mt-2">
                Login attempt {loginAttempts} - {loginAttempts >= 3 ? 'Consider signing up if you don\'t have an account' : ''}
              </p>
            )}
          </div>
        </div>

        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
              placeholder="john.doe@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-10 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button type="button" className="text-xs text-blue-600 hover:underline font-semibold hover:text-blue-700 transition-colors">
              Forgot your password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:from-blue-600 hover:to-purple-600 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </div>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-xs text-center">{error}</p>
            </div>
          )}
        </form>

        {/* Toggle Form */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-600">
            Don't have an account?
            <button
              type="button"
              onClick={onToggleForm}
              className="ml-1 text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Social Login Section */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500 font-medium">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button className="flex items-center justify-center px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group">
              <svg className="w-4 h-4 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="font-medium">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 