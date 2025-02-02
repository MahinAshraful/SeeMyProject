import React from 'react';

const NewProjectModal = ({ 
  item, 
  onClose, 
  onStart 
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="w-full max-w-2xl p-6 bg-blue-900 pixel-corners">
        <h2 className="mb-4 text-2xl text-yellow-400 pixel-text">{item.name}</h2>
        <p className="mb-6 text-white/90">{item.description}</p>
        
        <div className="flex gap-4">
          {item.name === "New Project" && (
            <button
              onClick={onStart}
              className="px-4 py-2 text-black bg-yellow-400 pixel-corners hover:bg-yellow-300"
            >
              START NEW PROJECT
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-gray-600 pixel-corners hover:bg-gray-500"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProjectModal;