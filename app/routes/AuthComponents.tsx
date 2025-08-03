import React from 'react';

// PasswordInput: A simple password input with show/hide toggle
interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  showPassword: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleVisibility: () => void;
}
export function PasswordInput({ label, name, value, showPassword, onChange, onToggleVisibility }: PasswordInputProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 pr-10"
          required
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
          tabIndex={-1}
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>
    </div>
  );
}

// SubmitButton: A button with loading state
interface SubmitButtonProps {
  isLoading: boolean;
  label: string;
}
export function SubmitButton({ isLoading, label }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : label}
    </button>
  );
}

// BackgroundElements: Decorative background
export function BackgroundElements() {
  return <div className="absolute inset-0 pointer-events-none z-0" />;
}

// FloatingHearts: Animated hearts (placeholder)
interface FloatingHeartsProps {
  count?: number;
}
export function FloatingHearts({ count = 8 }: FloatingHeartsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {[...Array(count)].map((_, i) => (
        <span key={i} className="absolute text-pink-300 animate-pulse" style={{ left: `${(i * 10) % 100}%`, top: `${(i * 13) % 100}%` }}>
          ❤️
        </span>
      ))}
    </div>
  );
}

// AppLogo: Simple logo placeholder
export function AppLogo() {
  return (
    <div className="flex justify-center mb-6 z-10 relative">
      <span className="text-3xl font-bold text-blue-600">MediNet+</span>
    </div>
  );
} 