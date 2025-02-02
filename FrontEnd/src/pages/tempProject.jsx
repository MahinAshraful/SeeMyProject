import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { WorkflowDot, PacMan } from '../components/WorkflowDot';
import GhostModal from '../components/GhostModal';
import '/styles/arcade.css';

const TempProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProjectData, setSelectedProjectData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  useEffect(() => {
    if (location.state?.workflow) {
      setSelectedProjectData(location.state.workflow);
    }
  }, [location.state]);

  const handleDotClick = (card, index) => {
    setSelectedCard(card);
    if (!completedTasks.includes(card.id)) {
      setCompletedTasks([...completedTasks, card.id]);
      setCurrentTaskIndex(index);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black">
      <div className="absolute inset-0 grid grid-cols-12 gap-4 p-4 opacity-20">
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="w-2 h-2 bg-blue-500 rounded-full" />
        ))}
      </div>

      <div className="container relative px-4 py-20 mx-auto">
        {selectedProjectData.length > 0 && (
          <div className="mb-20">
            <h2 className="mb-12 text-2xl text-center text-yellow-400 pixel-text">
              WORKFLOW MAP
            </h2>
            <div className="relative flex justify-center">
              <div className="relative flex flex-col gap-8 py-12">
                {selectedProjectData.map((card, index) => (
                  <WorkflowDot
                    key={card.id}
                    card={card}
                    index={index}
                    onClick={() => handleDotClick(card, index)}
                    isCompleted={completedTasks.includes(card.id)}
                  />
                ))}
                <PacMan 
                  currentIndex={currentTaskIndex} 
                  totalDots={selectedProjectData.length} 
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="p-8  bg-black/80">
          <div className="flex justify-center max-w-4xl gap-8 mx-auto">
            <button
              onClick={() => navigate('/home')}
              className="px-6 py-3 text-black transition-all duration-300 bg-yellow-400 arcade-btn pixel-corners hover:bg-yellow-300"
            >
              CREATE NEW PROJECT
            </button>
            <button
              onClick={() => navigate('/project')}
              className="px-6 py-3 text-black transition-all duration-300 bg-cyan-400 arcade-btn pixel-corners hover:bg-cyan-300"
            >
              VIEW ALL PROJECTS
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 text-black transition-all duration-300 bg-pink-400 arcade-btn pixel-corners hover:bg-pink-300"
            >
              GO TO DASHBOARD
            </button>
          </div>
        </div>
      </div>

      {selectedCard && (
        <GhostModal 
          card={selectedCard} 
          onClose={() => setSelectedCard(null)} 
        />
      )}
    </div>
  );
};

export default TempProject;