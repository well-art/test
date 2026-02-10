import React, { useState, useEffect } from 'react';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation on mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '2693988') {
      onLogin();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#24a145] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#595656] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div 
        className={`bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="flex justify-center mb-8">
          <div className="bg-[#e9f5ec] p-4 rounded-full">
            <ShieldCheck className="w-12 h-12 text-[#24a145]" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center text-[#595656] mb-2">企業知識庫中心</h2>
        <p className="text-center text-gray-400 mb-8 text-sm">Enterprise Knowledge Base Center</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">訪問密碼</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                className={`block w-full pl-10 pr-3 py-3 border ${
                  error ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-[#24a145] focus:border-[#24a145]'
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 sm:text-sm transition-all`}
                placeholder="請輸入密碼"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
              />
            </div>
            {error && <p className="mt-2 text-sm text-red-600">密碼錯誤，請重試。</p>}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#24a145] hover:bg-[#1e8a3b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#24a145] transition-colors duration-200"
          >
            登入系統
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};