import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

  const navigate = useNavigate();

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
    if (step !== 5) {
      nextStep();
      return;
    }

    // Only proceed with API call if on final step
    if (step === 5) {
        setIsLoading(true);
        const finalData = {
          project_name: data.projectName,
          project_description: data.projectDescription,
          technologies: technologies,
          new_technologies: unfamiliarTech,
          additional_info: data.additionalInfo
        };

        try {
          const response = await axios.post('http://127.0.0.1:5002/get-input', finalData, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: false
          });
          
          console.log('API Response:', response.data);
          setApiResponse(response.data);

          // Create clean JSON string with proper formatting
          const jsonString = JSON.stringify(response.data, null, 2);
          const blob = new Blob([jsonString], { 
            type: 'application/json;charset=utf-8'
          });
          
          // Create download link
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          const fileName = data.projectName.toLowerCase().replace(/\s+/g, '_');
          link.download = `${fileName}_workflow.json`;
          
          // Trigger download
          document.body.appendChild(link);
          link.click();
          
          // Cleanup
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          // Navigate to dashboard after download
          navigate('/dashboard');
        } catch (error) {
          if (error.response) {
            console.error('Server Error:', error.response.data.error);
            alert(error.response.data.error);
          } else if (error.request) {
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
            <label className="block mb-2 text-lg font-medium text-yellow-300">
              What is the name of your project?
            </label>
            <input
              {...register("projectName", { required: true })}
              className="w-full p-3 text-white bg-black border-2 border-cyan-400 focus:outline-none focus:border-pink-400 pixel-corners"
              placeholder="Enter project name"
            />
            {errors.projectName && <span className="text-red-500">This field is required</span>}
          </div>
        );
      case 2:
        return (
          <div>
            <label className="block mb-2 text-lg font-medium text-yellow-300">
              Write a brief description of your project
            </label>
            <textarea
              {...register("projectDescription", { required: true })}
              className="w-full p-3 text-white bg-black border-2 border-pink-400 focus:outline-none focus:border-cyan-400 pixel-corners"
              rows="4"
              placeholder="Describe your project goals, target audience, and main functionality"
            />
            {errors.projectDescription && <span className="text-red-500">This field is required</span>}
          </div>
        );
      case 3:
        return (
          <div>
            <label className="block mb-2 text-lg font-medium text-yellow-300">
              Do you know what tech stack you want to use?
            </label>
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={() => setShowTechInput(true)}
                className="px-4 py-2 text-black bg-cyan-400 arcade-btn pixel-corners hover:bg-cyan-300"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setShowTechInput(false)}
                className="px-4 py-2 text-black bg-pink-400 arcade-btn pixel-corners hover:bg-pink-300"
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
                      className={`inline-flex items-center gap-1 px-3 py-1 text-sm transition-colors duration-200 pixel-corners
                        ${index % 4 === 0 ? 'bg-red-500 text-white' : 
                          index % 4 === 1 ? 'bg-pink-400 text-black' :
                          index % 4 === 2 ? 'bg-cyan-400 text-black' :
                          'bg-orange-400 text-black'} 
                        hover:bg-blue-600 hover:text-white`}
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
                    className="flex-1 p-3 text-yellow-400 bg-black border-2 border-yellow-400 focus:outline-none focus:border-yellow-500 pixel-corners"
                    placeholder="Enter technology"
                  />
                  <button
                    type="button"
                    onClick={handleAddTechnology}
                    className="px-4 py-2 text-black bg-orange-400 arcade-btn pixel-corners hover:bg-orange-300"
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
            <label className="block mb-2 text-lg font-medium text-yellow-300">
              Which technologies are new to you?
            </label>
            <p className="mb-4 text-sm text-yellow-300">
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
                      ? 'bg-red-500 text-white' 
                      : 'bg-yellow-400 text-black hover:bg-pink-400'}`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <label className="block mb-2 text-lg font-medium text-yellow-300">
              Additional Details
            </label>
            <textarea
              {...register("additionalInfo")}
              className="w-full p-3 text-white bg-black border-2 border-pink-400 focus:outline-none focus:border-cyan-400 pixel-corners"
              rows="4"
              placeholder="Enter any additional information"
            />
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
          box-shadow: 0 0 10px #FFFF00, 0 0 20px #FFFF00, 0 0 30px #FFFF00;
          animation: neon 1.5s ease-in-out infinite alternate;
        }
        @keyframes neon {
          from { box-shadow: 0 0 10px #FFFF00, 0 0 20px #FFFF00, 0 0 30px #FFFF00; }
          to { box-shadow: 0 0 5px #FFFF00, 0 0 10px #FFFF00, 0 0 15px #FFFF00; }
        }
        .pac-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #FFFF00;
          border-radius: 50%;
          animation: blink 0.5s ease-in-out infinite alternate;
        }
        @keyframes blink {
          from { opacity: 1; }
          to { opacity: 0.5; }
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

        .pac-progress {
          background: linear-gradient(to right, #FFFF00 50%, transparent 50%);
          background-size: 20px 20px;
          animation: move 0.5s linear infinite;
        }

        @keyframes move {
          from { background-position: 0 0; }
          to { background-position: 20px 0; }
        }
      `}</style>

      <StarBackground />

      <div className="relative z-10 max-w-4xl mx-auto">
        {apiResponse ? (
          <div className="p-8 mb-8 bg-black neon-border pixel-corners">
            <h2 className="mb-4 text-2xl font-bold text-yellow-400">PROJECT BLUEPRINT</h2>
            <pre className="p-4 overflow-auto text-yellow-300 bg-black rounded-md pixel-corners">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
            <button
              onClick={() => setApiResponse(null)}
              className="px-4 py-2 mt-4 font-bold tracking-wider text-black uppercase transition-all duration-300 bg-yellow-400 arcade-btn pixel-corners hover:bg-yellow-300"
            >
              NEW PROJECT
            </button>
          </div>
        ) : (
          <div className="p-8 bg-black neon-border pixel-corners">
            <h1 className="mb-8 text-3xl font-bold text-center text-yellow-400">
              PROJECT BUILDER
            </h1>
            
            <div className="w-full h-4 mb-8 overflow-hidden bg-blue-900 rounded-full pixel-corners">
              <div 
                className="h-full transition-all duration-300 pac-progress" 
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {renderStep()}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 font-bold tracking-wider text-yellow-400 uppercase transition-all duration-300 border-2 border-yellow-400 pixel-corners hover:bg-yellow-900"
                  >
                    Previous
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 ml-auto font-bold tracking-wider uppercase transition-all duration-300 pixel-corners ${
                    isLoading ? 'bg-gray-700 text-gray-300' : 'bg-yellow-400 text-black hover:bg-yellow-300'
                  }`}
                >
                  {isLoading ? 'PROCESSING...' : step === 5 ? 'SUBMIT' : 'NEXT'}
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