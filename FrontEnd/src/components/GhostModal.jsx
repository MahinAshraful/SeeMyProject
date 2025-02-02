import React from 'react';
import { Book, Code, Rocket, Ghost } from 'lucide-react';

const GhostModal = ({ card, onClose }) => {
  const typeIcons = {
    learn: Book,
    build: Code,
    deploy: Rocket
  };
  const Icon = typeIcons[card.type] || Book;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="relative w-full max-w-2xl p-6 bg-blue-900 pixel-corners">
        {/* Ghost decoration */}
        <Ghost className="absolute w-32 h-32 text-white/10 -top-12 -right-8" />
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-black pixel-corners">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl text-yellow-400 pixel-text">{card.name}</h2>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-white/90 pixel-text">
              {card.description}
            </p>

            {/* Technologies */}
            <div className="space-y-2">
              <h3 className="text-sm text-yellow-400 pixel-text">TECHNOLOGIES:</h3>
              <div className="flex flex-wrap gap-2">
                {card.technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-1 text-xs text-white bg-black pixel-corners">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Dependencies */}
            {card.dependencies.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm text-yellow-400 pixel-text">REQUIRES:</h3>
                <div className="flex flex-wrap gap-2">
                  {card.dependencies.map((dep, i) => (
                    <span key={i} className="px-2 py-1 text-xs text-white/70 bg-black/50 pixel-corners">
                      Task {dep}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute px-4 py-2 text-black transition-colors bg-yellow-400 -top-2 -right-2 hover:bg-yellow-300 pixel-corners"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default GhostModal;