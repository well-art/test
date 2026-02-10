import React from 'react';
import { BookOpen, GitBranch, FileText, Search, LayoutGrid } from 'lucide-react';
import { MainCategory } from '../types';

interface NavbarProps {
  currentView: MainCategory | 'search';
  onNavigate: (view: MainCategory | 'search') => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onSearchChange, searchQuery }) => {
  
  const navItems = [
    { id: 'regulations' as const, label: '規章制度', icon: BookOpen },
    { id: 'flowcharts' as const, label: '粒子流程表', icon: GitBranch },
    { id: 'forms' as const, label: '共用表格', icon: FileText },
  ];

  return (
    <nav className="bg-[#24a145] shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Brand */}
          <div className="flex items-center flex-shrink-0 cursor-pointer" onClick={() => onNavigate('regulations')}>
            <div className="bg-white p-1.5 rounded-lg mr-2">
              <LayoutGrid className="h-6 w-6 text-[#24a145]" />
            </div>
            <span className="font-bold text-xl text-white tracking-wide">EKB Center</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentView === item.id
                      ? 'bg-[#1e8a3b] text-white shadow-inner'
                      : 'text-white hover:bg-[#34b457]'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-300" />
              </div>
              <input
                type="text"
                placeholder="搜尋文件..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (e.target.value && currentView !== 'search') {
                    onNavigate('search');
                  }
                }}
                className="bg-[#1e8a3b] text-white placeholder-gray-300 border-none ring-0 focus:ring-2 focus:ring-white/50 rounded-full pl-10 pr-4 py-1.5 text-sm transition-all w-48 focus:w-64"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav (Simplified for this demo) */}
      <div className="md:hidden flex justify-around bg-[#1e8a3b] py-2">
         {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center px-2 py-1 rounded text-xs font-medium ${
                 currentView === item.id ? 'text-white bg-black/10' : 'text-green-100'
              }`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              {item.label}
            </button>
          ))}
      </div>
    </nav>
  );
};