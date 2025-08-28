import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import OTPVerification from './components/OTPVerification';
import { useAuth } from '@/app/routes/auth-context';

interface AuthPageProps {
  onLoginSuccess?: () => void;
}

export type AuthStep = 'login' | 'signup' | 'otp';

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('login');
  const [otpData, setOtpData] = useState<{
    email: string;
    type: 'login' | 'signup';
    userName?: string;
  } | null>(null);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  
  const { isAuthenticated } = useAuth();

  // Check server status on component mount
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        console.log('AuthPage: Checking server status...');
        
        // Try multiple endpoints to check server status
        const endpoints = [
          'http://localhost:3000/ping',
          'http://localhost:3000/test',
          'http://localhost:3000/'
        ];
        
        let serverOnline = false;
        
        for (const endpoint of endpoints) {
          try {
            console.log(`AuthPage: Trying endpoint: ${endpoint}`);
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            
            const response = await fetch(endpoint, {
              method: 'GET',
              signal: controller.signal,
              headers: {
                'Content-Type': 'application/json',
              },
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
              const data = await response.text();
              console.log(`AuthPage: Server responded at ${endpoint}:`, data);
              serverOnline = true;
              break;
            } else {
              console.log(`AuthPage: Endpoint ${endpoint} responded with status:`, response.status);
            }
          } catch (endpointError: any) {
            console.log(`AuthPage: Endpoint ${endpoint} failed:`, endpointError.message);
            continue;
          }
        }
        
        if (serverOnline) {
          setServerStatus('online');
          console.log('AuthPage: Server is online');
        } else {
          setServerStatus('offline');
          console.log('AuthPage: All server endpoints failed');
        }
        
      } catch (error) {
        console.log('AuthPage: Server status check failed:', error);
        setServerStatus('offline');
      }
    };

    checkServerStatus();
    
    // Re-check server status every 30 seconds
    const interval = setInterval(checkServerStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // If user is already authenticated, trigger success callback
  useEffect(() => {
    if (isAuthenticated && onLoginSuccess) {
      onLoginSuccess();
    }
  }, [isAuthenticated, onLoginSuccess]);

  const handleToggleForm = () => {
    setCurrentStep(currentStep === 'login' ? 'signup' : 'login');
  };

  const handleShowOTP = (email: string, type: 'login' | 'signup', userName?: string) => {
    setOtpData({ email, type, userName });
    setCurrentStep('otp');
  };

  const handleOTPBack = () => {
    setCurrentStep(otpData?.type === 'signup' ? 'signup' : 'login');
    setOtpData(null);
  };

  const handleOTPSuccess = () => {
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  // Show server status warning if offline
  if (serverStatus === 'offline') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Server Unavailable</h2>
          <p className="text-gray-600 mb-6">
            The server is currently offline. Please ensure the server is running on port 3000.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Retry Connection
            </button>
            <button
              onClick={() => setServerStatus('checking')}
              className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Check Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while checking server status
  if (serverStatus === 'checking') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Checking Server</h2>
          <p className="text-gray-600">
            Verifying server connection...
          </p>
        </div>
      </div>
    );
  }

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

      {/* Server Status Indicator */}
      <div className="text-center mb-4 z-10">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
          serverStatus === 'online' ? 'bg-green-100 text-green-700' :
          serverStatus === 'offline' ? 'bg-red-100 text-red-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            serverStatus === 'online' ? 'bg-green-500' :
            serverStatus === 'offline' ? 'bg-red-500' :
            'bg-yellow-500'
          }`}></div>
          {serverStatus === 'online' ? 'Server Online' :
           serverStatus === 'offline' ? 'Server Offline' :
           'Checking Server...'}
        </div>
      </div>

      {/* Auth Forms */}
      <div className="z-10">
        {currentStep === 'login' && (
          <LoginForm
            onShowOTP={(email) => handleShowOTP(email, 'login')}
            onToggleForm={handleToggleForm}
          />
        )}
        
        {currentStep === 'signup' && (
          <SignupForm
            onShowOTP={(email, name) => handleShowOTP(email, 'signup', name)}
            onToggleForm={handleToggleForm}
          />
        )}
        
        {currentStep === 'otp' && otpData && (
          <OTPVerification
            email={otpData.email}
            type={otpData.type}
            userName={otpData.userName}
            onVerificationSuccess={handleOTPSuccess}
            onBack={handleOTPBack}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage; 