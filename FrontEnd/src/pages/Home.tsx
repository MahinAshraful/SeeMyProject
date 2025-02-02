

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ArcadeLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating login
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('Welcome Player One!');
    setLoading(false);
  };

  const createStars = () => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 1}s`
      });
    }
    return stars;
  };

  const StarBackground = () => {
    const stars = createStars();
    return (
      <div id="stars-container">
        {stars.map((star, index) => (
          <div
            key={index}
            className="stars"
            style={{
              left: star.left,
              top: star.top,
              animationDuration: star.animationDuration
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black">
      <style jsx global>{`
        body {
          font-family: 'Press Start 2P', cursive;
          background: #000;
          overflow: hidden;
        }
        .neon-border {
          box-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff;
          animation: neon 1.5s ease-in-out infinite alternate;
        }
        @keyframes neon {
          from { box-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff; }
          to { box-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 15px #0ff; }
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
        .arcade-btn:hover {
          transform: scale(1.05);
          transition: all 0.2s ease;
        }
        .arcade-btn:active {
          transform: scale(0.95);
        }
        .stars {
          position: absolute;
          width: 1px;
          height: 1px;
          background: white;
          z-index: 0;
        }
      `}</style>

      <StarBackground />

      <Card className="relative z-10 w-full max-w-md p-8 mx-4 bg-gray-900 neon-border pixel-corners">
        <CardHeader className="mb-8 text-center">
          <CardTitle className="mb-4 text-2xl md:text-3xl text-cyan-400">
            ARCADE LOGIN
          </CardTitle>
          <p className="text-xs md:text-sm text-cyan-300">
            INSERT COIN TO CONTINUE
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="block text-sm text-cyan-400">
                PLAYER NAME
              </Label>
              <Input
                type="text"
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full p-3 bg-black border-2 border-cyan-400 text-cyan-400 focus:outline-none focus:border-cyan-500 pixel-corners"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="block text-sm text-cyan-400">
                SECRET CODE
              </Label>
              <Input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full p-3 bg-black border-2 border-cyan-400 text-cyan-400 focus:outline-none focus:border-cyan-500 pixel-corners"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 font-bold tracking-wider text-black uppercase transition-all duration-300 bg-cyan-500 arcade-btn pixel-corners hover:bg-cyan-400"
            >
              {loading ? 'LOADING...' : 'PRESS START'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-xs transition-colors duration-300 text-cyan-400 hover:text-cyan-300">
              NEW PLAYER? REGISTER HERE
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArcadeLogin;