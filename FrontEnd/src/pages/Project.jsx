import { useState } from "react";
import { Link } from "react-router-dom";

const Project = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [leftJoystickPos, setLeftJoystickPos] = useState({ x: 0, y: 0 });
  const [rightJoystickPos, setRightJoystickPos] = useState({ x: 0, y: 0 });

  const handleItemClick = (item, isLeft) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    
    if (isLeft) {
      setLeftJoystickPos({ x: -5, y: -5 });
      setTimeout(() => setLeftJoystickPos({ x: 0, y: 0 }), 200);
    } else {
      setRightJoystickPos({ x: -5, y: -5 });
      setTimeout(() => setRightJoystickPos({ x: 0, y: 0 }), 200);
    }
  };

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

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-2xl p-6 bg-gray-800 pixel-corners">
            <h2 className="mb-4 text-2xl text-white">{selectedItem.name}</h2>
            <p className="mb-4 text-gray-300">{selectedItem.description}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-white bg-gray-600 pixel-corners hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Home Button */}
      <Link
        to="/home"
        className="fixed flex items-center justify-center w-20 h-20 bg-green-500 rounded-full bottom-8 right-8 arcade-btn hover:bg-green-400 pixel-corners"
      >
        <div className="text-4xl text-center text-white">8</div>
      </Link>

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