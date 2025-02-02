// src/pages/Project/Project.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { WorkflowDot, PacMan } from '../components/WorkflowDot';
import GhostModal from '../components/GhostModal';
import Joystick from '../components/Joystick';
import ProjectSelectionModal from '../components/ProjectSelectionModal';
import NewProjectModal from '../components/NewProjectModal';



import '/styles/arcade.css';

const Project = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [leftJoystickPos, setLeftJoystickPos] = useState({ x: 0, y: 0 });
  const [rightJoystickPos, setRightJoystickPos] = useState({ x: 0, y: 0 });
  const [projects, setProjects] = useState([]);
  const [selectedProjectData, setSelectedProjectData] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  useEffect(() => {
    if (isProjectsModalOpen) {
      fetchUserProjects();
    }
  }, [isProjectsModalOpen]);

  const fetchUserProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/links?email=mahinashraful08@gmail.com');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received data:', data);
      setProjects(data.links || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectData = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSelectedProjectData(data);
    } catch (error) {
      console.error('Error fetching project data:', error);
      setError('Failed to load project data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item, isLeft) => {
    if (isLeft) {
      setIsProjectsModalOpen(true);
      setLeftJoystickPos({ x: -5, y: -5 });
      setTimeout(() => setLeftJoystickPos({ x: 0, y: 0 }), 200);
    } else {
      setSelectedItem(item);
      setIsModalOpen(true);
      setRightJoystickPos({ x: -5, y: -5 });
      setTimeout(() => setRightJoystickPos({ x: 0, y: 0 }), 200);
    }
  };

  const handleProjectSelect = async (url) => {
    await fetchProjectData(url);
    setIsProjectsModalOpen(false);
  };

  const handleDotClick = (card, index) => {
    setSelectedCard(card);
    if (!completedTasks.includes(card.id)) {
      setCompletedTasks([...completedTasks, card.id]);
      setCurrentTaskIndex(index);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Background pattern */}
      <div className="absolute inset-0 grid grid-cols-12 gap-4 p-4 opacity-20">
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="w-2 h-2 bg-blue-500 rounded-full" />
        ))}
      </div>

      {/* Main content */}
      <div className="container relative px-4 py-20 mx-auto">
        {selectedProjectData && (
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
      </div>

      {/* Joysticks */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-between p-8 bg-gradient-to-t from-black to-transparent">
        <Joystick
          position={leftJoystickPos}
          color="blue"
          label="My Projects"
          onClick={() => handleItemClick({
            name: "My Projects",
            description: "View all your existing projects"
          }, true)}
        />
        <Joystick
          position={rightJoystickPos}
          color="red"
          label="New Project"
          onClick={() => handleItemClick({
            name: "New Project",
            description: "Start a new project"
          }, false)}
        />
      </div>

      {/* Project Selection Modal */}
      {isProjectsModalOpen && (
        <ProjectSelectionModal
          projects={projects}
          loading={loading}
          error={error}
          onSelect={handleProjectSelect}
          onClose={() => setIsProjectsModalOpen(false)}
        />
      )}

      {/* New Project Modal */}
      {isModalOpen && selectedItem && (
        <NewProjectModal
          item={selectedItem}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          onStart={() => navigate('/home')}
        />
      )}

      {/* Ghost Modal */}
      {selectedCard && (
        <GhostModal 
          card={selectedCard} 
          onClose={() => setSelectedCard(null)} 
        />
      )}
    </div>
  );
};

export default Project;