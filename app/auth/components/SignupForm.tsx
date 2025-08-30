import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles, Heart, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/app/routes/auth-context';
import { useToast } from '@/hooks/use-toast';

interface SignupFormProps {
  onShowOTP: (email: string, name: string) => void;
  onToggleForm: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onShowOTP, onToggleForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const { signup } = useAuth();
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
    setSuccess(null);
    
    console.log('SignupForm: Starting signup process for:', formData.email);
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      // First, attempt signup
      const response = await signup(
        `${formData.firstName} ${formData.lastName}`,
        formData.email,
        formData.password
      );
      console.log('SignupForm: Signup response:', response);
      
      if (response.success) {
        // If signup is successful, proceed to OTP verification
        console.log('SignupForm: Signup successful, proceeding to OTP verification');
        onShowOTP(formData.email, `${formData.firstName} ${formData.lastName}`);
      } else {
        console.log('SignupForm: Signup failed, error:', response.message);
        
        if (response.message?.includes('already exists') || response.message?.includes('User already exists')) {
          setError('User already exists. Please login instead.');
          setTimeout(() => {
            onToggleForm(); // Switch to login
          }, 2000);
        } else if (response.message?.includes('Server connection failed') || response.message?.includes('Cannot connect to server')) {
          setError('Server connection failed. Please ensure the server is running on port 3001.');
        } else {
          setError(response.message || 'Registration failed');
        }
      }
    } catch (err: any) {
      console.error('SignupForm: Error during signup process:', err);
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
          <button
            onClick={onToggleForm}
            className="absolute left-0 top-0 p-1 rounded-full hover:bg-gray-100 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <div className="relative inline-block">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Create Account
              </h2>
              <div className="absolute -top-1 -right-6">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Join us to start your health journey
            </p>
          </div>
        </div>

        <form className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
                placeholder="Doe"
                required
              />
            </div>
          </div>

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

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-10 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
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
                <span>Creating Account...</span>
              </div>
            ) : (
              <span>Sign Up</span>
            )}
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-xs text-center">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-600 text-xs text-center">{success}</p>
            </div>
          )}
        </form>

        {/* Toggle Form */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-600">
            Already have an account?
            <button
              type="button"
              onClick={onToggleForm}
              className="ml-1 text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>

        {/* Terms and Privacy */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            By signing up, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm; 