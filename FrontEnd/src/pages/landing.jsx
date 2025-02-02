import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-black font-['Press_Start_2P']">
      {/* Background Dots */}
      <div className="fixed inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="pac-dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="flex items-center justify-center min-h-[70vh] px-4">
          <div className="text-center">
            <h1 className="mb-6 text-4xl text-yellow-400 md:text-6xl neon-text">
              SEE MY PROJECT
            </h1>
            <p className="mb-8 text-xl text-cyan-400">
              LEVEL UP YOUR PROJECT PLANNING
            </p>
            <div className="space-x-4">
              <Link
                to="/login"
                className="inline-block px-8 py-4 text-black bg-yellow-400 arcade-btn pixel-corners hover:bg-yellow-300"
              >
                START GAME
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 py-12">
          <h2 className="mb-12 text-2xl text-center text-yellow-400">POWER-UPS</h2>
          <div className="container grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 bg-red-500/20 neon-border pixel-corners">
              <h3 className="mb-4 text-xl text-red-400">Project Planning</h3>
              <p className="text-gray-300">Guide your project from start to finish</p>
            </div>
            <div className="p-6 bg-pink-500/20 neon-border pixel-corners">
              <h3 className="mb-4 text-xl text-pink-400">Tech Stack</h3>
              <p className="text-gray-300">Choose your weapons wisely</p>
            </div>
            <div className="p-6 bg-cyan-500/20 neon-border pixel-corners">
              <h3 className="mb-4 text-xl text-cyan-400">Learning Path</h3>
              <p className="text-gray-300">Level up your skills</p>
            </div>
            <div className="p-6 bg-orange-500/20 neon-border pixel-corners">
              <h3 className="mb-4 text-xl text-orange-400">Blueprint</h3>
              <p className="text-gray-300">Generate your victory plan</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-20 text-center">
          <Link
            to="/signup"
            className="inline-block px-8 py-4 text-black bg-yellow-400 arcade-btn pixel-corners hover:bg-yellow-300"
          >
            INSERT COIN TO START
          </Link>
        </section>
      </div>

      <style jsx>{`
        .neon-text {
          text-shadow: 0 0 10px #FFFF00, 0 0 20px #FFFF00;
        }
        .neon-border {
          box-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
        }
        .pac-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #FFFF00;
          border-radius: 50%;
          animation: blink 0.5s ease-in-out infinite alternate;
        }
        .arcade-btn {
          position: relative;
          transform: scale(1);
          transition: transform 0.2s;
          box-shadow: 0 6px 0 #000;
        }
        .arcade-btn:active {
          transform: scale(0.95) translateY(4px);
          box-shadow: 0 2px 0 #000;
        }
        .pixel-corners {
          clip-path: polygon(
            0 10px, 10px 10px, 10px 0,
            calc(100% - 10px) 0, calc(100% - 10px) 10px,
            100% 10px, 100% calc(100% - 10px),
            calc(100% - 10px) calc(100% - 10px),
            calc(100% - 10px) 100%, 10px 100%,
            10px calc(100% - 10px), 0 calc(100% - 10px)
          );
        }
        @keyframes blink {
          from { opacity: 1; }
          to { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Landing;