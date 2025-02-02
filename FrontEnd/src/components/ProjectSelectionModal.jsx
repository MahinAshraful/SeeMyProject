
import React from 'react';
import { Ghost } from 'lucide-react';

const ProjectSelectionModal = ({ 
  projects, 
  loading, 
  error, 
  onSelect, 
  onClose 
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="w-full max-w-2xl p-6 bg-blue-900 pixel-corners">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl text-yellow-400 pixel-text">SELECT PROJECT</h2>
          <button
            onClick={onClose}
            className="px-4 py-2 text-black bg-yellow-400 pixel-corners hover:bg-yellow-300"
          >
            CLOSE
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center p-8">
            <div className="w-4 h-4 bg-yellow-400 animate-bounce" />
          </div>
        )}

        {error && (
          <div className="p-4 mb-4 text-white bg-red-500/50 pixel-corners">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {projects.map((url, index) => (
            <button
              key={index}
              onClick={() => onSelect(url)}
              className="relative p-4 text-left transition-all transform bg-yellow-400 group pixel-text pixel-corners hover:bg-yellow-300"
            >
              <Ghost className="absolute w-6 h-6 text-blue-500 transition-all opacity-0 -right-2 group-hover:opacity-100 group-hover:-right-4" />
              <span className="text-black">PROJECT {index + 1}</span>
            </button>
          ))}
        </div>

        {!loading && !error && projects.length === 0 && (
          <div className="text-xl text-center text-white pixel-text">
            NO PROJECTS FOUND
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSelectionModal;