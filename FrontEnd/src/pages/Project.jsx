import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Project = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [leftJoystickPos, setLeftJoystickPos] = useState({ x: 0, y: 0 });
  const [rightJoystickPos, setRightJoystickPos] = useState({ x: 0, y: 0 });
  const [projects, setProjects] = useState([]);
  const [selectedProjectData, setSelectedProjectData] = useState(null);
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

  // Same JSX as before, but with error handling added to the Projects List Modal
  return (
    <div className="container relative w-full h-screen p-4 mx-auto">
      <div className="fixed bottom-0 left-0 right-0 flex justify-between p-8">
        {/* My Projects Joystick */}
        <button
          className="flex flex-col items-center group"
          onClick={() => handleItemClick({ name: "My Projects", description: "View all your existing projects" }, true)}
        >
          <div className="relative w-32 h-32 mb-4 transition-transform transform bg-gray-800 pixel-corners arcade-base">
            <div 
              className="absolute w-24 h-24 transition-all transform -translate-x-1/2 -translate-y-1/2 bg-blue-900 pixel-corners top-1/2 left-1/2 joystick"
              style={{ 
                transform: `translate(calc(-50% + ${leftJoystickPos.x}px), calc(-50% + ${leftJoystickPos.y}px))`
              }}
            >
              <div className="absolute inset-0 w-full h-full transition-colors bg-blue-800 pixel-corners group-hover:bg-blue-700" />
            </div>
          </div>
          <span className="text-xl font-bold text-white pixel-text">My Projects</span>
        </button>

        {/* New Project Joystick */}
        <button
          className="flex flex-col items-center group"
          onClick={() => handleItemClick({ name: "New Project", description: "Start a new project" }, false)}
        >
          <div className="relative w-32 h-32 mb-4 transition-transform transform bg-gray-800 pixel-corners arcade-base">
            <div 
              className="absolute w-24 h-24 transition-all transform -translate-x-1/2 -translate-y-1/2 bg-red-900 pixel-corners top-1/2 left-1/2 joystick"
              style={{ 
                transform: `translate(calc(-50% + ${rightJoystickPos.x}px), calc(-50% + ${rightJoystickPos.y}px))`
              }}
            >
              <div className="absolute inset-0 w-full h-full transition-colors bg-red-800 pixel-corners group-hover:bg-red-700" />
            </div>
          </div>
          <span className="text-xl font-bold text-white pixel-text">New Project</span>
        </button>
      </div>

      {/* Projects List Modal */}
      {isProjectsModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-4xl p-6 overflow-hidden bg-gray-800 pixel-corners">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl text-white">My Projects</h2>
              <button
                onClick={() => {
                  setIsProjectsModalOpen(false);
                  setSelectedProjectData(null);
                  setError(null);
                }}
                className="px-3 py-1 text-white bg-gray-600 pixel-corners hover:bg-gray-500"
              >
                Close
              </button>
            </div>
            
            {loading && (
              <div className="text-white">Loading...</div>
            )}

            {error && (
              <div className="p-4 mb-4 text-white bg-red-500/50 pixel-corners">
                {error}
              </div>
            )}

            {!loading && !error && projects.length === 0 && (
              <div className="text-white">No projects found.</div>
            )}

            <div className="grid grid-cols-1 gap-4 mb-4">
              {projects.map((url, index) => (
                <button
                  key={index}
                  onClick={() => fetchProjectData(url)}
                  className="p-4 text-left text-white transition-colors bg-gray-700 pixel-corners hover:bg-gray-600"
                >
                  Project {index + 1}
                </button>
              ))}
            </div>

            {selectedProjectData && (
              <div className="mt-4">
                <h3 className="mb-2 text-xl text-white">Project Data:</h3>
                <pre className="p-4 overflow-auto text-sm text-white bg-gray-900 pixel-corners max-h-96">
                  {JSON.stringify(selectedProjectData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Project Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-2xl p-6 bg-gray-800 pixel-corners">
            <h2 className="mb-4 text-2xl text-white">{selectedItem.name}</h2>
            <p className="mb-4 text-gray-300">{selectedItem.description}</p>
            
            <div className="flex gap-4">
              {selectedItem.name === "New Project" && (
                <button
                  onClick={() => navigate('/home')}
                  className="px-4 py-2 text-white bg-blue-600 pixel-corners hover:bg-blue-500"
                >
                  Let me try this new project
                </button>
              )}
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedItem(null);
                }}
                className="px-4 py-2 text-white bg-gray-600 pixel-corners hover:bg-gray-500"
              >
                Close
              </button>
            </div>
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
        .arcade-base {
          box-shadow: 0 4px 0 #000;
        }
        .joystick {
          box-shadow: 0 2px 0 #000;
          transition: transform 0.2s ease-out;
        }
        .pixel-text {
          font-family: 'Press Start 2P', monospace;
          text-shadow: 2px 2px 0 #000;
        }
      `}</style>
    </div>
  );
};

export default Project;