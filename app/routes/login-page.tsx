// HealthAppAuthMobile.tsx
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Sparkles, Heart, Shield, Users, Activity, ArrowLeft } from 'lucide-react';

interface AuthFormProps {
  isLogin: boolean;
  toggleForm: () => void;
  onLogin?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, toggleForm, onLogin }) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {        
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      if (isLogin) {
        // Simulate login success without backend
        setTimeout(() => {
          setSuccess('Login successful! (mocked)');
          setIsLoading(false);
          if (onLogin) onLogin();
        }, 1000);
      } else {
        // Simulate registration success without backend
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        setTimeout(() => {
          setSuccess('Registration successful! (mocked)');
          setIsLoading(false);
        }, 1000);
      }
    } catch (err) {
      setError('Network error (mocked)');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden z-10">
      <div className="p-6">
        {/* Form Header */}
        <div className="relative mb-6">
          {!isLogin && (
            <button
              onClick={toggleForm}
              className="absolute left-0 top-0 p-1 rounded-full hover:bg-gray-100 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <div className="text-center">
            <div className="relative inline-block">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <div className="absolute -top-1 -right-6">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {isLogin 
                ? 'Sign in to access your personalized health dashboard'
                : 'Join us to start your health journey'
              }
            </p>
          </div>
        </div>

        <form className="space-y-4">
          {/* Name Fields (Signup only) */}
          {!isLogin && (
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
          )}

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

          {/* Confirm Password (Signup only) */}
          {!isLogin && (
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
          )}

          {/* Forgot Password (Login only) */}
          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-xs text-blue-600 hover:underline font-semibold hover:text-blue-700 transition-colors">
                Forgot your password?
              </button>
            </div>
          )}

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
                <span>Processing...</span>
              </div>
            ) : (
              <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
            )}
          </button>

          {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
          {success && <p className="text-green-600 text-xs mt-2 text-center">{success}</p>}
        </form>

        {/* Toggle Form */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={toggleForm}
              className="ml-1 text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-colors"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Social Login Section (Login only) */}
        {isLogin && (
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
        )}
      </div>
    </div>
  );
};

const SignupPage: React.FC<{ toggleForm: () => void }> = ({ toggleForm }) => {
  return (
    <div className="relative h-screen w-full max-w-md mx-auto overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center p-6">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-green-200/30 to-blue-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-indigo-200/20 to-pink-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Enhanced Floating Hearts Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Central Heart */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '2s' }}>
          <Heart className="w-16 h-16 text-pink-200/30" fill="currentColor" />
        </div>
        
        {/* Medium Hearts */}
        <div className="absolute top-1/4 left-1/4 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <Heart className="w-8 h-8 text-pink-300/40" />
        </div>
        <div className="absolute top-1/4 right-1/4 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <Heart className="w-8 h-8 text-pink-300/40" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
          <Heart className="w-8 h-8 text-pink-300/40" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>
          <Heart className="w-8 h-8 text-pink-300/40" />
        </div>

        {/* Small Hearts */}
        <div className="absolute top-16 left-16 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <Heart className="w-5 h-5 text-pink-300/50" />
        </div>
        <div className="absolute top-32 right-24 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <Heart className="w-5 h-5 text-pink-300/50" />
        </div>
        <div className="absolute bottom-28 left-24 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
          <Heart className="w-5 h-5 text-pink-300/50" />
        </div>
        <div className="absolute bottom-16 right-16 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>
          <Heart className="w-5 h-5 text-pink-300/50" />
        </div>
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ animationDelay: '0.7s', animationDuration: '3.2s' }}>
          <Heart className="w-5 h-5 text-pink-300/50" />
        </div>
        <div className="absolute bottom-1/4 right-1/3 transform translate-x-1/2 animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '3.8s' }}>
          <Heart className="w-5 h-5 text-pink-300/50" />
        </div>
        <div className="absolute top-1/3 left-1/4 animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '4.2s' }}>
          <Heart className="w-5 h-5 text-pink-300/50" />
        </div>
        <div className="absolute top-2/3 right-1/4 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.6s' }}>
          <Heart className="w-5 h-5 text-pink-300/50" />
        </div>
        <div className="absolute top-1/5 left-1/5 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '4.1s' }}>
          <Heart className="w-5 h-5 text-pink-300/50" />
        </div>
        <div className="absolute bottom-1/5 right-1/5 animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '3.9s' }}>
          <Heart className="w-5 h-5 text-pink-300/50" />
        </div>

        {/* Extra Small Hearts */}
        <div className="absolute top-12 left-8 animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '2.8s' }}>
          <Heart className="w-3 h-3 text-pink-200/60" />
        </div>
        <div className="absolute top-20 right-12 animate-bounce" style={{ animationDelay: '1.3s', animationDuration: '3.7s' }}>
          <Heart className="w-3 h-3 text-pink-200/60" />
        </div>
        <div className="absolute bottom-20 left-12 animate-bounce" style={{ animationDelay: '0.9s', animationDuration: '3.1s' }}>
          <Heart className="w-3 h-3 text-pink-200/60" />
        </div>
        <div className="absolute bottom-12 right-8 animate-bounce" style={{ animationDelay: '1.7s', animationDuration: '4.3s' }}>
          <Heart className="w-3 h-3 text-pink-200/60" />
        </div>

        {/* Rotating Hearts */}
        <div className="absolute top-1/3 right-1/3 animate-spin" style={{ animationDuration: '8s' }}>
          <Heart className="w-6 h-6 text-pink-400/30" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }}>
          <Heart className="w-6 h-6 text-pink-400/30" />
        </div>

        {/* Floating Hearts with Different Colors */}
        <div className="absolute top-1/6 left-1/6 animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '3.4s' }}>
          <Heart className="w-4 h-4 text-red-300/40" />
        </div>
        <div className="absolute top-1/6 right-1/6 animate-bounce" style={{ animationDelay: '1.1s', animationDuration: '3.9s' }}>
          <Heart className="w-4 h-4 text-red-300/40" />
        </div>
        <div className="absolute bottom-1/6 left-1/6 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '4.1s' }}>
          <Heart className="w-4 h-4 text-red-300/40" />
        </div>
        <div className="absolute bottom-1/6 right-1/6 animate-bounce" style={{ animationDelay: '1.4s', animationDuration: '3.6s' }}>
          <Heart className="w-4 h-4 text-red-300/40" />
        </div>
      </div>

      {/* Mobile Logo */}
      <div className="flex items-center justify-center space-x-3 mb-8 z-10">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          HealthCare+
        </h1>
      </div>

      {/* Auth Form */}
      <AuthForm isLogin={false} toggleForm={toggleForm} />
    </div>
  );
};

export default function HealthAppAuthMobile({ onLogin }: { onLogin?: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  if (!mounted) return null;

  if (!isLogin) {
    return <SignupPage toggleForm={toggleForm} />;
  }

  return (
    <div className="relative h-screen w-full max-w-md mx-auto overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center p-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-green-200/30 to-blue-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-indigo-200/20 to-pink-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Enhanced Floating Hearts Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Central Heart */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '2s' }}>
          <Heart className="w-16 h-16 text-pink-200/30" fill="currentColor" />
        </div>
        
        {/* Medium Hearts */}
        <div className="absolute top-1/4 left-1/4 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <Heart className="w-8 h-8 text-pink-300/40" />
        </div>
        <div className="absolute top-1/4 right-1/4 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <Heart className="w-8 h-8 text-pink-300/40" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
          <Heart className="w-8 h-8 text-pink-300/40" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>
          <Heart className="w-8 h-8 text-pink-300/40" />
        </div>

        {/* Small Hearts */}
        <div className="absolute top-16 left-16 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <Heart className="w-5 h-5 text-pink-300/50" />
        </div>
        <div className="absolute top-32 right-24 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <Heart className="w-5 h-5 text-pink-300/50" />
        </div>
        <div className="absolute bottom-28 left-24 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
          <Heart className="w-5 h-5 text-pink-300/50" />
        </div>
        <div className="absolute bottom-16 right-16 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>
          <Heart className="w-5 h-5 text-pink-300/50" />
        </div>

        {/* Extra Small Hearts */}
        <div className="absolute top-12 left-8 animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '2.8s' }}>
          <Heart className="w-3 h-3 text-pink-200/60" />
        </div>
        <div className="absolute top-20 right-12 animate-bounce" style={{ animationDelay: '1.3s', animationDuration: '3.7s' }}>
          <Heart className="w-3 h-3 text-pink-200/60" />
        </div>
        <div className="absolute bottom-20 left-12 animate-bounce" style={{ animationDelay: '0.9s', animationDuration: '3.1s' }}>
          <Heart className="w-3 h-3 text-pink-200/60" />
        </div>
        <div className="absolute bottom-12 right-8 animate-bounce" style={{ animationDelay: '1.7s', animationDuration: '4.3s' }}>
          <Heart className="w-3 h-3 text-pink-200/60" />
        </div>

        {/* Rotating Hearts */}
        <div className="absolute top-1/3 right-1/3 animate-spin" style={{ animationDuration: '8s' }}>
          <Heart className="w-6 h-6 text-pink-400/30" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }}>
          <Heart className="w-6 h-6 text-pink-400/30" />
        </div>

        {/* Floating Hearts with Different Colors */}
        <div className="absolute top-1/6 left-1/6 animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '3.4s' }}>
          <Heart className="w-4 h-4 text-red-300/40" />
        </div>
        <div className="absolute top-1/6 right-1/6 animate-bounce" style={{ animationDelay: '1.1s', animationDuration: '3.9s' }}>
          <Heart className="w-4 h-4 text-red-300/40" />
        </div>
        <div className="absolute bottom-1/6 left-1/6 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '4.1s' }}>
          <Heart className="w-4 h-4 text-red-300/40" />
        </div>
        <div className="absolute bottom-1/6 right-1/6 animate-bounce" style={{ animationDelay: '1.4s', animationDuration: '3.6s' }}>
          <Heart className="w-4 h-4 text-red-300/40" />
        </div>
      </div>

      {/* Mobile Logo */}
      <div className="flex items-center justify-center space-x-3 mb-8 z-10">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          HealthCare+
        </h1>
      </div>

      {/* Auth Form */}
      <AuthForm isLogin={true} toggleForm={toggleForm} onLogin={onLogin} />
    </div>
  );
}