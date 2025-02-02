import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b-2 border-blue-500">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Home Button */}
          <Link to="/" className="text-yellow-400 hover:text-yellow-300">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
            </svg>
          </Link>

          {/* Animated Title Container */}
          <div className="relative flex items-center w-[500px] h-16 overflow-hidden">
            {/* Ghosts Group */}
            <div className="absolute flex items-center space-x-1"> {/* Reduced spacing */}
              <div className="ghost ghost-red animate-move-ghost"></div>
              <div className="ghost ghost-pink animate-move-ghost"></div>
              <div className="ghost ghost-cyan animate-move-ghost"></div>
              <div className="ghost ghost-orange animate-move-ghost"></div>
            </div>

            {/* Text */}
            <div className="absolute flex items-center">
              <span className="text-2xl text-white font-pixel animate-fade">SEE MY PROJECT</span>
            </div>

            {/* Pacman */}
            <div className="absolute animate-move-pacman" style={{ left: '-30px' }}>
              <div className="w-8 h-8">
                <div className="pacman"></div>
              </div>
            </div>
          </div>

          {/* Login/Logout Button */}
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="px-4 py-2 text-black bg-yellow-400 rounded hover:bg-yellow-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-black bg-yellow-400 rounded hover:bg-yellow-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <style jsx>{`
        .pacman {
          width: 0px;
          height: 0px;
          border-right: 16px solid transparent;
          border-top: 16px solid yellow;
          border-left: 16px solid yellow;
          border-bottom: 16px solid yellow;
          border-radius: 16px;
          animation: eat 0.4s linear infinite;
        }

        .ghost {
          width: 16px;
          height: 16px;
          border-radius: 8px 8px 0 0;
          position: relative;
        }

        .ghost::before {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          top: 4px;
          left: 4px;
        }

        .ghost-red { background: #ff0000; }
        .ghost-pink { background: #ffb8ff; }
        .ghost-cyan { background: #00ffff; }
        .ghost-orange { background: #ffb852; }

        @keyframes movePacman {
          0% { transform: translateX(-110px); }
          100% { transform: translateX(780px); }
        }

        @keyframes moveGhost {
          0% { transform: translateX(-80px); opacity: 1; }
          100% { transform: translateX(780px); opacity: 1; }
        }

        @keyframes fadeText {
          0%, 40% { opacity: 1; transform: translateX(120px); }
          60%, 100% { opacity: 1; transform: translateX(120px); }
        }

        .animate-move-pacman {
          animation: movePacman 4s linear infinite;
        }

        .animate-move-ghost {
          animation: moveGhost 4s linear infinite;
        }

        .animate-fade {
          animation: fadeText 4s linear infinite;
        }

        @keyframes eat {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(45deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;