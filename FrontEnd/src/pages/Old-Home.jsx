import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Home = () => {
  const [step, setStep] = useState(1);
  const [technologies, setTechnologies] = useState([]);
  const [currentTech, setCurrentTech] = useState("");
  const [showTechInput, setShowTechInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [unfamiliarTech, setUnfamiliarTech] = useState([]);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const handleAddTechnology = () => {
    if (currentTech.trim()) {
      setTechnologies([...technologies, currentTech.trim()]);
      setCurrentTech("");
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const onSubmit = async (data) => {
    if (step !== 4) {
      nextStep();
      return;
    }

    // Only proceed with API call if on final step
    if (step === 4) {
      setIsLoading(true);
      const finalData = {
        project_name: data.projectName,
        project_description: data.projectDescription,
        technologies: technologies,
        new_technologies: unfamiliarTech,
        target_industry: "Finance",
        target_audience: "Young adults",
        additional_info: ""
      };

      try {
        const response = await axios.post('http://127.0.0.1:5000/get-input', finalData, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: false
        });
        console.log('API Response:', response.data);
        setApiResponse(response.data);
      } catch (error) {
        if (error.response) {
          // Server responded with error
          console.error('Server Error:', error.response.data.error);
          alert(error.response.data.error);
        } else if (error.request) {
          // Request made but no response
          console.error('Network Error');
          alert('Network error - please check if the server is running');
        } else {
          console.error('Error:', error.message);
          alert('An error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    }
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <label className="block mb-2 text-lg font-medium text-white">
              What is the name of your project?
            </label>
            <input
              {...register("projectName", { required: true })}
              className="w-full p-3 bg-black border-2 border-cyan-400 text-cyan-400 focus:outline-none focus:border-cyan-500 pixel-corners"
              placeholder="Enter project name"
            />
            {errors.projectName && <span className="text-red-500">This field is required</span>}
          </div>
        );
      case 2:
        return (
          <div>
            <label className="block mb-2 text-lg font-medium text-white">
              Write a brief description of your project
            </label>
            <textarea
              {...register("projectDescription", { required: true })}
              className="w-full p-3 bg-black border-2 border-cyan-400 text-cyan-400 focus:outline-none focus:border-cyan-500 pixel-corners"
              rows="4"
              placeholder="Describe your project goals, target audience, and main functionality"
            />
            {errors.projectDescription && <span className="text-red-500">This field is required</span>}
          </div>
        );
      case 3:
        return (
          <div>
            <label className="block mb-2 text-lg font-medium text-white">
              Do you know what tech stack you want to use?
            </label>
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={() => setShowTechInput(true)}
                className="px-4 py-2 text-white bg-blue-500 rounded-md"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setShowTechInput(false)}
                className="px-4 py-2 text-white bg-blue-500 rounded-md"
              >
                No
              </button>
            </div>

            {showTechInput && (
              <div className="mt-6 ">
                <div className="flex flex-wrap gap-2 mt-4">
                  {technologies.map((tech, index) => (
                    <button
                      key={index}
                      onClick={() => setTechnologies(technologies.filter((_, i) => i !== index))}
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm text-black transition-colors duration-200 bg-cyan-400 pixel-corners hover:bg-red-400"
                    >
                      {tech}
                      <span className="font-medium">&times;</span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={currentTech}
                    onChange={(e) => setCurrentTech(e.target.value)}
                    className="flex-1 p-3 bg-black border-2 border-cyan-400 text-cyan-400 focus:outline-none focus:border-cyan-500 pixel-corners"
                    placeholder="Enter technology"
                  />
                  <button
                    type="button"
                    onClick={handleAddTechnology}
                    className="px-4 py-2 text-white bg-blue-500 rounded-md"
                  >
                    Add
                  </button>
                </div>
                
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div>
            <label className="block mb-2 text-lg font-medium text-cyan-400">
              Which technologies are new to you?
            </label>
            <p className="mb-4 text-sm text-cyan-300">
              Click the technologies you're not familiar with
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {technologies.map((tech, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent form submission
                    const isUnfamiliar = unfamiliarTech.includes(tech);
                    if (isUnfamiliar) {
                      setUnfamiliarTech(unfamiliarTech.filter(t => t !== tech));
                    } else {
                      setUnfamiliarTech([...unfamiliarTech, tech]);
                    }
                  }}
                  className={`inline-flex items-center gap-1 px-3 py-1 text-sm transition-colors duration-200 pixel-corners
                    ${unfamiliarTech.includes(tech) 
                      ? 'bg-red-400 text-white' 
                      : 'bg-cyan-400 text-black hover:bg-cyan-300'}`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen px-4 py-12 bg-black sm:px-6 lg:px-8">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
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
        .stars {
          position: absolute;
          width: 1px;
          height: 1px;
          background: white;
          z-index: 0;
        }
      `}</style>

      <StarBackground />

      <div className="relative z-10 max-w-4xl mx-auto">
        {apiResponse ? (
          <div className="p-8 mb-8 bg-gray-900 neon-border pixel-corners">
            <h2 className="mb-4 text-2xl font-bold text-cyan-400">PROJECT BLUEPRINT</h2>
            <pre className="p-4 overflow-auto bg-black rounded-md text-cyan-300 pixel-corners">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
            <button
              onClick={() => setApiResponse(null)}
              className="px-4 py-2 mt-4 font-bold tracking-wider text-black uppercase transition-all duration-300 bg-cyan-500 arcade-btn pixel-corners hover:bg-cyan-400"
            >
              NEW PROJECT
            </button>
          </div>
        ) : (
          <div className="p-8 bg-gray-900 neon-border pixel-corners">
            <h1 className="mb-8 text-3xl font-bold text-center text-cyan-400">
              PROJECT BUILDER
            </h1>
            
            <div className="w-full h-2 mb-8 bg-black rounded-full pixel-corners">
              <div 
                className="h-full transition-all duration-300 rounded-full bg-cyan-500" 
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {renderStep()}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 font-bold tracking-wider uppercase transition-all duration-300 border-2 text-cyan-400 border-cyan-400 pixel-corners hover:bg-cyan-900"
                  >
                    Previous
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 ml-auto font-bold tracking-wider uppercase transition-all duration-300 pixel-corners ${
                    isLoading ? 'bg-cyan-700 text-gray-300' : 'bg-cyan-500 text-black hover:bg-cyan-400'
                  }`}
                >
                  {isLoading ? 'PROCESSING...' : step === 4 ? 'GENERATE' : 'NEXT'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;