import React from 'react';
import { X, FileText, Download, ExternalLink } from 'lucide-react';
import { DocumentItem } from '../types';

interface DocumentModalProps {
  document: DocumentItem | null;
  onClose: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ document, onClose }) => {
  if (!document) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          
          {/* Header */}
          <div className="bg-[#595656] px-4 py-3 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-white flex items-center" id="modal-title">
              <FileText className="mr-2 h-5 w-5" />
              {document.title}
            </h3>
            <button
              type="button"
              className="bg-transparent rounded-md text-gray-200 hover:text-white focus:outline-none"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content (Preview) */}
          <div className="bg-gray-100 px-4 py-4 sm:px-6 h-[60vh] flex flex-col items-center justify-center">
             {/* Mock Google Drive Viewer */}
             <div className="w-full h-full bg-white border border-gray-300 shadow-inner flex flex-col items-center justify-center rounded-md relative overflow-hidden group">
                <img 
                  src={`https://picsum.photos/seed/${document.id}/800/600`} 
                  alt="Document Preview" 
                  className="absolute inset-0 w-full h-full object-cover opacity-10 blur-[1px]" 
                />
                <div className="z-10 text-center p-8 bg-white/90 rounded-xl shadow-lg">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo_%282020%29.svg" 
                        alt="Google Drive" 
                        className="w-16 h-16 mx-auto mb-4"
                    />
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Google Drive Preview</h4>
                    <p className="text-gray-500 text-sm mb-4">
                        此為文件預覽區域。<br/>
                        實際應用時，此處將嵌入 Google Doc/Drive iframe。
                    </p>
                    <div className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded">
                        ID: {document.id} | TYPE: {document.type.toUpperCase()}
                    </div>
                </div>
             </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#24a145] text-base font-medium text-white hover:bg-[#1e8a3b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#24a145] sm:ml-3 sm:w-auto sm:text-sm items-center transition-colors"
              onClick={() => alert(`正在下載 ${document.title}.pdf ...`)}
            >
              <Download className="w-4 h-4 mr-2" />
              下載 PDF
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#595656] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm items-center transition-colors"
              onClick={() => window.open(`https://docs.google.com/viewer?q=${document.title}`, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              線上閱讀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};