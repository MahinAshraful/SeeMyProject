export const workflow = {
  workflow: [
    {
      category: "frontend",
      dependencies: [],
      description:
        "Understand the basics of React Native for mobile app development.",
      id: "learn_react_native",
      name: "Learn React Native",
      resources: ["https://reactnative.dev/docs/getting-started"],
      technologies: ["React Native"],
      type: "learn",
    },
    {
      category: "frontend",
      dependencies: [],
      description:
        "Explore Svelte Kit for building web applications with a focus on performance.",
      id: "learn_svelte_kit",
      name: "Learn Svelte Kit",
      resources: ["https://kit.svelte.dev/docs"],
      technologies: ["Svelte Kit"],
      type: "learn",
    },
    {
      category: "backend",
      dependencies: [],
      description:
        "Get familiar with Go programming language for backend development.",
      id: "learn_go",
      name: "Learn Go",
      resources: ["https://golang.org/doc/"],
      technologies: ["Go"],
      type: "learn",
    },
    {
      category: "frontend",
      dependencies: ["learn_react_native", "learn_svelte_kit"],
      description:
        "Develop the frontend components of the easy meets app using React Native and Svelte Kit.",
      id: "build_frontend_app",
      name: "Build Frontend App with React Native and Svelte Kit",
      resources: [
        "https://reactnative.dev/docs/components-and-apis",
        "https://kit.svelte.dev/docs",
      ],
      technologies: ["React Native", "Svelte Kit"],
      type: "build",
    },
    {
      category: "backend",
      dependencies: ["learn_go"],
      description:
        "Create backend services for easy meets using Go and Python.",
      id: "build_backend_services",
      name: "Build Backend Services with Go and Python",
      resources: ["https://golang.org/doc/", "https://docs.python.org/3/"],
      technologies: ["Go", "Python"],
      type: "build",
    },
    {
      category: "database",
      dependencies: [],
      description:
        "Design the database schema for storing user and restaurant data using SQL.",
      id: "build_database_structure",
      name: "Build Database Structure with SQL",
      resources: ["https://www.w3schools.com/sql/"],
      technologies: ["SQL"],
      type: "build",
    },
    {
      category: "deployment",
      dependencies: [
        "build_frontend_app",
        "build_backend_services",
        "build_database_structure",
      ],
      description:
        "Utilize Expo for deploying the easy meets app to mobile devices.",
      id: "deploy_using_expo",
      name: "Deploy Using Expo",
      resources: ["https://docs.expo.dev/"],
      technologies: ["Expo"],
      type: "deploy",
    },
  ],
};
