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
    if (step !== 3) {
      nextStep();
      return;
    }

    setIsLoading(true);
    const finalData = {
      project_name: data.projectName,
      project_description: data.projectDescription,
      technologies: technologies,
      new_technologies: technologies,
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
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <label className="block mb-2 text-lg font-medium">
              What is the name of your project?
            </label>
            <input
              {...register("projectName", { required: true })}
              className="w-full p-3 border rounded-md"
              placeholder="Enter project name"
            />
            {errors.projectName && <span className="text-red-500">This field is required</span>}
          </div>
        );
      case 2:
        return (
          <div>
            <label className="block mb-2 text-lg font-medium">
              Write a brief description of your project
            </label>
            <textarea
              {...register("projectDescription", { required: true })}
              className="w-full p-3 border rounded-md"
              rows="4"
              placeholder="Describe your project goals, target audience, and main functionality"
            />
            {errors.projectDescription && <span className="text-red-500">This field is required</span>}
          </div>
        );
      case 3:
        return (
          <div>
            <label className="block mb-2 text-lg font-medium">
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
              <div className="mt-4">
                <div className="flex flex-wrap gap-2 mt-4">
                  {technologies.map((tech, index) => (
                    <button
                      key={index}
                      onClick={() => setTechnologies(technologies.filter((_, i) => i !== index))}
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm text-blue-700 transition-colors duration-200 bg-blue-100 rounded-full hover:bg-red-100 hover:text-red-700"
                    >
                      {tech}
                      <span className="font-medium">&times;</span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentTech}
                    onChange={(e) => setCurrentTech(e.target.value)}
                    className="flex-1 p-2 border rounded-md"
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
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {apiResponse ? (
          <div className="p-8 mb-8 bg-white rounded-lg shadow-xl">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Your Project Blueprint</h2>
            <pre className="p-4 overflow-auto rounded-md bg-gray-50">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
            <button
              onClick={() => setApiResponse(null)}
              className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Start New Project
            </button>
          </div>
        ) : (
          <div className="p-8 bg-white rounded-lg shadow-xl">
            <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
              Let's Design Your Project
            </h1>
            
            {/* Progress Bar */}
            <div className="w-full h-2 mb-8 bg-gray-200 rounded-full">
              <div 
                className="h-full transition-all duration-300 bg-blue-500 rounded-full" 
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {renderStep()}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                  >
                    Previous
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 ml-auto text-white rounded-md ${
                    isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isLoading ? 'Processing...' : step === 3 ? 'Generate Blueprint' : 'Next'}
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