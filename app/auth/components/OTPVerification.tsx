import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";
import { Mail, Clock, RefreshCw, CheckCircle, XCircle } from "lucide-react";

interface OTPVerificationProps {
  email: string;
  type: 'login' | 'signup';
  onVerificationSuccess: () => void;
  onBack: () => void;
  userName?: string;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  type,
  onVerificationSuccess,
  onBack,
  userName
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const { toast } = useToast();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Auto-submit when all digits are entered
    if (newOtp.every(digit => digit !== '') && index === 5) {
      handleVerifyOTP();
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Send OTP
  const sendOTP = async () => {
    setIsResending(true);
    try {
      const endpoint = type === 'signup' ? '/otp/send-signup-otp' : '/otp/send-login-otp';
      const body = type === 'signup' ? { email, name: userName || 'User' } : { email };
      
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "OTP Sent!",
          description: `Verification code sent to ${email}`,
        });
        setTimeLeft(300);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        setVerificationStatus('idle');
      } else {
        toast({
          title: "Failed to send OTP",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Failed to send OTP. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setVerificationStatus('idle');
    
    try {
      const response = await fetch('http://localhost:3000/otp/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp: otpString,
          type
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setVerificationStatus('success');
        toast({
          title: "Verification Successful!",
          description: "Your account has been verified successfully.",
        });
        
        // Wait a moment to show success state
        setTimeout(() => {
          onVerificationSuccess();
        }, 1500);
      } else {
        setVerificationStatus('error');
        toast({
          title: "Verification Failed",
          description: data.message,
          variant: "destructive",
        });
        // Clear OTP on error
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      setVerificationStatus('error');
      toast({
        title: "Network Error",
        description: "Failed to verify OTP. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = () => {
    if (!canResend) return;
    sendOTP();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-xl border border-white/50">
        <CardContent className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {type === 'signup' ? 'Verify Your Account' : 'Verify Your Login'}
            </h2>
            <p className="text-gray-600 text-sm">
              We've sent a 6-digit code to
            </p>
            <p className="text-blue-600 font-semibold">{email}</p>
          </div>

          {/* OTP Input */}
          <div className="mb-6">
            <div className="flex justify-center gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-lg font-bold border-2 ${
                    verificationStatus === 'success' 
                      ? 'border-green-500 bg-green-50' 
                      : verificationStatus === 'error'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 focus:border-blue-500'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed`}
                  disabled={isLoading}
                />
              ))}
            </div>
            
            {/* Status Indicator */}
            {verificationStatus === 'success' && (
              <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Verification successful!</span>
              </div>
            )}
            
            {verificationStatus === 'error' && (
              <div className="flex items-center justify-center gap-2 text-red-600 mb-4">
                <XCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Invalid code. Please try again.</span>
              </div>
            )}
          </div>

          {/* Timer */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
              <Clock className="w-4 h-4" />
              <span>Code expires in {formatTime(timeLeft)}</span>
            </div>
            
            {timeLeft === 0 && (
              <p className="text-red-600 text-sm font-medium">
                Code expired. Please request a new one.
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleVerifyOTP}
              disabled={isLoading || otp.join('').length !== 6}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying...
                </div>
              ) : (
                'Verify Code'
              )}
            </Button>

            <Button
              onClick={handleResendOTP}
              disabled={!canResend || isResending}
              variant="outline"
              className="w-full"
            >
              {isResending ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Sending...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  {canResend ? 'Resend Code' : `Resend in ${formatTime(timeLeft)}`}
                </div>
              )}
            </Button>

            <Button
              onClick={onBack}
              variant="ghost"
              className="w-full text-gray-600"
            >
              ← Back to {type === 'signup' ? 'Sign Up' : 'Login'}
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Didn't receive the code? Check your spam folder or try resending.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerification; 