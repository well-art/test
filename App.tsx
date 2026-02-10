import React, { useState, useMemo } from 'react';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { DocumentModal } from './components/DocumentModal';
import { REGULATIONS_DATA, FLOWCHARTS_DATA, FORMS_DATA, ALL_DATA } from './constants';
import { DocumentItem, MainCategory, SectionData } from './types';
import { FolderOpen, FileText, ChevronRight, Search } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<MainCategory | 'search'>('regulations');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  // Determine which data to show
  const currentData: SectionData | undefined = useMemo(() => {
    switch (currentView) {
      case 'regulations': return REGULATIONS_DATA;
      case 'flowcharts': return FLOWCHARTS_DATA;
      case 'forms': return FORMS_DATA;
      default: return undefined;
    }
  }, [currentView]);

  // Search Logic
  const searchResults = useMemo(() => {
    if (currentView !== 'search' || !searchQuery.trim()) return [];
    
    const results: { groupName: string; item: DocumentItem; category: string }[] = [];
    
    ALL_DATA.forEach(section => {
      section.groups.forEach(group => {
        group.items.forEach(item => {
          if (item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            results.push({
              groupName: group.name,
              item,
              category: section.title
            });
          }
        });
      });
    });
    return results;
  }, [currentView, searchQuery]);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        currentView={currentView} 
        onNavigate={(view) => {
          setCurrentView(view);
          if (view !== 'search') setSearchQuery('');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#595656] flex items-center">
            {currentView === 'search' ? (
              <>
                <Search className="mr-3 text-[#24a145]" />
                搜尋結果
              </>
            ) : (
              <>
                <FolderOpen className="mr-3 text-[#24a145]" />
                {currentData?.title}
              </>
            )}
          </h1>
          <div className="h-1 w-20 bg-[#24a145] mt-2 rounded-full"></div>
        </div>

        {/* Content Section */}
        <div className="space-y-8 animate-fade-in-up">
          
          {/* Regular Category View */}
          {currentView !== 'search' && currentData && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentData.groups.map((group) => (
                <div key={group.name} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#595656]">{group.name}</h3>
                    <span className="text-xs font-medium bg-green-100 text-[#24a145] px-2 py-0.5 rounded-full">
                      {group.items.length} 份文件
                    </span>
                  </div>
                  <ul className="divide-y divide-gray-100">
                    {group.items.map((item) => (
                      <li 
                        key={item.id} 
                        className="px-5 py-3 hover:bg-[#f0f9f1] cursor-pointer transition-colors group flex items-center justify-between"
                        onClick={() => setSelectedDoc(item)}
                      >
                        <div className="flex items-center space-x-3 overflow-hidden">
                            <div className={`p-1.5 rounded-md ${
                                item.type === 'pdf' ? 'bg-red-50 text-red-500' :
                                item.type === 'doc' ? 'bg-blue-50 text-blue-500' :
                                'bg-green-50 text-green-500'
                            }`}>
                                <FileText className="w-4 h-4" />
                            </div>
                            <div className="truncate">
                                <p className="text-sm font-medium text-gray-700 group-hover:text-[#24a145] transition-colors truncate">
                                    {item.title}
                                </p>
                                <p className="text-xs text-gray-400">{item.date}</p>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#24a145]" />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Search View */}
          {currentView === 'search' && (
             <div className="bg-white rounded-xl shadow-md overflow-hidden min-h-[50vh]">
                {searchResults.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {searchResults.map((result, idx) => (
                      <li 
                        key={`${result.item.id}-${idx}`} 
                        className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between"
                        onClick={() => setSelectedDoc(result.item)}
                      >
                         <div className="flex items-center">
                            <div className="bg-gray-100 p-2 rounded-lg mr-4 text-gray-500">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-base font-semibold text-gray-800">{result.item.title}</h4>
                                <div className="flex items-center text-sm text-gray-500 mt-1 space-x-2">
                                    <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{result.category}</span>
                                    <span>&bull;</span>
                                    <span className="text-xs">{result.groupName}</span>
                                    <span>&bull;</span>
                                    <span className="text-xs">{result.item.date}</span>
                                </div>
                            </div>
                         </div>
                         <button className="text-[#24a145] text-sm font-medium hover:underline">查看</button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <Search className="w-12 h-12 mb-4 text-gray-200" />
                    <p className="text-lg">找不到相關文件</p>
                    <p className="text-sm">請嘗試其他關鍵字</p>
                  </div>
                )}
             </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Enterprise Knowledge Base Center. Internal Use Only.</p>
        </div>
      </footer>

      {/* Modal */}
      <DocumentModal 
        document={selectedDoc} 
        onClose={() => setSelectedDoc(null)} 
      />
    </div>
  );
};

export default App;