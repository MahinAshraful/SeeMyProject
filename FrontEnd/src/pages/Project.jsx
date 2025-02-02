import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Book, Code, Rocket, Ghost, Timer } from "lucide-react";

const WorkflowCard = ({ card, highlighted, onClick }) => {
  const typeColors = {
    learn: { bg: "bg-yellow-400", hover: "hover:bg-yellow-300", icon: Book, text: "text-black" },
    build: { bg: "bg-cyan-400", hover: "hover:bg-cyan-300", icon: Code, text: "text-black" },
    deploy: { bg: "bg-pink-500", hover: "hover:bg-pink-400", icon: Rocket, text: "text-white" }
  };

  const style = typeColors[card.type] || typeColors.build;
  const Icon = style.icon;

  return (
    <button 
      onClick={() => onClick(card)}
      className={`w-full p-4 transition-all ${style.bg} ${style.hover} pixel-corners arcade-card ${
        highlighted ? 'scale-105 ring-4 ring-blue-400' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-black pixel-corners">
          <Icon className="w-6 h-6 text-white animate-pulse" />
        </div>
        <div className="flex-1 text-left">
          <h3 className={`mb-2 text-lg font-bold ${style.text} pixel-text`}>{card.name}</h3>
          <p className={`text-sm ${style.text} opacity-80`}>{card.description}</p>
          {card.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {card.technologies.map((tech, i) => (
                <span key={i} className="px-2 py-1 text-xs text-white bg-black/80 pixel-corners">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

const ProjectsList = ({ projects, onSelectProject, onClose }) => (
  <div className="grid grid-cols-1 gap-4 p-4">
    {projects.map((url, index) => (
      <button
        key={index}
        onClick={() => onSelectProject(url)}
        className="relative p-4 text-left transition-all transform bg-yellow-400 group pixel-text pixel-corners hover:bg-yellow-300"
      >
        <Ghost className="absolute w-6 h-6 text-blue-500 transition-all opacity-0 -right-2 group-hover:opacity-100 group-hover:-right-4" />
        <div className="flex items-center gap-2">
          <Timer className="w-6 h-6 text-black" />
          <span className="text-black">PROJECT {index + 1}</span>
        </div>
      </button>
    ))}
  </div>
);

const Project = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [leftJoystickPos, setLeftJoystickPos] = useState({ x: 0, y: 0 });
  const [rightJoystickPos, setRightJoystickPos] = useState({ x: 0, y: 0 });
  const [projects, setProjects] = useState([]);
  const [selectedProjectData, setSelectedProjectData] = useState(null);
  const [highlightedCard, setHighlightedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (isProjectsModalOpen) {
      fetchUserProjects();
    }
  }, [isProjectsModalOpen]);

  const fetchUserProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      // Update this URL to match your Flask server
      const response = await fetch('http://127.0.0.1:5000/api/links?email=mahinashraful08@gmail.com');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received data:', data); // Debug log
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

  const handleCardClick = (card) => {
    setHighlightedCard(card);
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

  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Background dots */}
      <div className="absolute inset-0 grid grid-cols-12 gap-4 p-4">
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-blue-500/20" />
        ))}
      </div>

      {/* Main content */}
      <div className="relative">
        {/* Selected Project Display */}
        {selectedProjectData && (
          <div className="container px-4 py-20 mx-auto">
            <div className="flex justify-between mb-8">
              <h2 className="text-3xl text-yellow-400 pixel-text">WORKFLOW MAP</h2>
              <button
                onClick={() => setSelectedProjectData(null)}
                className="px-4 py-2 text-black bg-yellow-400 pixel-corners hover:bg-yellow-300"
              >
                BACK
              </button>
            </div>
            <div className="grid gap-6">
              {selectedProjectData.map((card, index) => (
                <div key={card.id} className="relative">
                  <WorkflowCard
                    card={card}
                    highlighted={highlightedCard?.id === card.id}
                    onClick={handleCardClick}
                  />
                  {card.dependencies.length > 0 && (
                    <div className="absolute inset-x-0 h-8 border-l-4 border-r-4 top-full -z-10 border-blue-400/50 animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Joysticks Section */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-between p-8 bg-gradient-to-t from-black to-transparent">
        {/* My Projects Joystick */}
        <button
          className="flex flex-col items-center group"
          onClick={() => handleItemClick({ name: "My Projects", description: "View all your existing projects" }, true)}
        >
          <div className="relative w-32 h-32 mb-4 transition-transform transform bg-blue-900 pixel-corners arcade-base">
            <div 
              className="absolute w-24 h-24 transition-all transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 pixel-corners top-1/2 left-1/2 joystick"
              style={{ 
                transform: `translate(calc(-50% + ${leftJoystickPos.x}px), calc(-50% + ${leftJoystickPos.y}px))`
              }}
            >
              <div className="absolute inset-0 w-full h-full transition-colors bg-yellow-400 pixel-corners group-hover:bg-yellow-300" />
            </div>
          </div>
          <span className="text-xl font-bold text-yellow-400 pixel-text">My Projects</span>
        </button>

        {/* New Project Joystick */}
        <button
          className="flex flex-col items-center group"
          onClick={() => handleItemClick({ name: "New Project", description: "Start a new project" }, false)}
        >
          <div className="relative w-32 h-32 mb-4 transition-transform transform bg-pink-900 pixel-corners arcade-base">
            <div 
              className="absolute w-24 h-24 transition-all transform -translate-x-1/2 -translate-y-1/2 bg-pink-500 pixel-corners top-1/2 left-1/2 joystick"
              style={{ 
                transform: `translate(calc(-50% + ${rightJoystickPos.x}px), calc(-50% + ${rightJoystickPos.y}px))`
              }}
            >
              <div className="absolute inset-0 w-full h-full transition-colors bg-pink-500 pixel-corners group-hover:bg-pink-400" />
            </div>
          </div>
          <span className="text-xl font-bold text-pink-500 pixel-text">New Project</span>
        </button>
      </div>

      {/* Projects Selection Modal */}
      {isProjectsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="w-full max-w-2xl p-6 bg-blue-900 pixel-corners">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl text-yellow-400 pixel-text">SELECT PROJECT</h2>
              <button
                onClick={() => setIsProjectsModalOpen(false)}
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
              <div className="p-4 mb-4 text-white bg-red-500 pixel-corners">
                {error}
              </div>
            )}

            <ProjectsList 
              projects={projects}
              onSelectProject={handleProjectSelect}
              onClose={() => setIsProjectsModalOpen(false)}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .pixel-corners {
          clip-path: polygon(
            0 4px, 4px 4px, 4px 0,
            calc(100% - 4px) 0, calc(100% - 4px) 4px,
            100% 4px, 100% calc(100% - 4px),
            calc(100% - 4px) calc(100% - 4px),
            calc(100% - 4px) 100%, 4px 100%,
            4px calc(100% - 4px), 0 calc(100% - 4px)
          );
        }
        .arcade-card {
          box-shadow: 0 4px 0 rgba(0, 0, 0, 0.5);
          transition: all 0.2s ease;
        }
        .arcade-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 0 rgba(0, 0, 0, 0.5);
        }
        .arcade-base {
          box-shadow: 0 4px 0 rgba(0, 0, 0, 0.8);
        }
        .joystick {
          box-shadow: 0 2px 0 rgba(0, 0, 0, 0.8);
          transition: transform 0.2s ease-out;
        }
        .pixel-text {
          font-family: 'Press Start 2P', monospace;
          text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Project;