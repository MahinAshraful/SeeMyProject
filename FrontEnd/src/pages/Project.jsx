
import { useState } from "react";

const Project = ({ workflow }) => {

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterByCategory = (category) => {
    return workflow.filter(item => item.category === category);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="container p-4 mx-auto mt-20">
      <div className="flex flex-wrap gap-4">
        {/* Frontend Card */}
        <div className="w-full md:w-[calc(50%-1rem)] p-6 bg-purple-500/20 rounded-lg">
          <h2 className="mb-4 text-2xl text-purple-400">Frontend</h2>
          <div className="space-y-2">
            {filterByCategory("frontend").map(item => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="p-3 rounded cursor-pointer bg-purple-500/10 hover:bg-purple-500/30"
              >
                <h3 className="text-white">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Backend Card */}
        <div className="w-full md:w-[calc(50%-1rem)] p-6 bg-blue-500/20 rounded-lg">
          <h2 className="mb-4 text-2xl text-blue-400">Backend</h2>
          <div className="space-y-2">
            {filterByCategory("backend").map(item => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="p-3 rounded cursor-pointer bg-blue-500/10 hover:bg-blue-500/30"
              >
                <h3 className="text-white">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Database Card */}
        <div className="w-full md:w-[calc(50%-1rem)] p-6 bg-green-500/20 rounded-lg">
          <h2 className="mb-4 text-2xl text-green-400">Database</h2>
          <div className="space-y-2">
            {filterByCategory("database").map(item => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="p-3 rounded cursor-pointer bg-green-500/10 hover:bg-green-500/30"
              >
                <h3 className="text-white">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Deploy Card */}
        <div className="w-full md:w-[calc(50%-1rem)] p-6 bg-yellow-500/20 rounded-lg">
          <h2 className="mb-4 text-2xl text-yellow-400">Deploy</h2>
          <div className="space-y-2">
            {filterByCategory("deployment").map(item => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="p-3 rounded cursor-pointer bg-yellow-500/10 hover:bg-yellow-500/30"
              >
                <h3 className="text-white">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
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