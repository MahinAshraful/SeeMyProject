import { useState, useEffect } from "react";

const Project = () => {
  const [workflow, setWorkflow] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(() => {
  fetch(
    "https://image-upload-bucket-hackbrown-2025.s3.amazonaws.com/system_design_4b3980e1-4f6b-4f69-b247-1783e9b76456.json"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((text) => {
      const cleanedText = text.replace(/^```json\n|```$/g, '');
      const unescapedText = cleanedText.replace(/\\"/g, '"');

      try {
        const data = JSON.parse(unescapedText);
        console.log("Parsed JSON Data:", data); // Log the *entire* parsed JSON object
        setWorkflow(data);
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError, unescapedText);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}, []);



  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="container p-4 mx-auto mt-20">
      <div className="flex flex-wrap gap-4">
        {workflow.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="w-full md:w-[calc(50%-1rem)] p-6 rounded-lg cursor-pointer bg-gray-700/20 hover:bg-gray-700/30"
          >
            <h2 className="mb-2 text-xl text-white">{item.name}</h2>
            <p className="text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-2xl p-6 bg-gray-800 rounded-lg">
            <h2 className="mb-4 text-2xl text-white">{selectedItem.name}</h2>
            <p className="mb-4 text-gray-300">{selectedItem.description}</p>
            <div className="mb-4">
              <h3 className="mb-2 text-white">Resources:</h3>
              <ul className="text-blue-400 list-disc list-inside">
                {selectedItem.resources.map((resource, index) => (
                  <li key={index}>
                    <a href={resource} target="_blank" rel="noopener noreferrer">
                      {resource}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
