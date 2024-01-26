

  interface Project {
    id: number;
    name: string;
  }
  
  let projects: Project[] = [];
  let projectIdCounter = 1;
  
  // Load projects from local storage
  const storedProjects = localStorage.getItem('projects');
  if (storedProjects) {
    projects = JSON.parse(storedProjects);
    projectIdCounter = Math.max(...projects.map(project => project.id)) + 1;
  }
  
  function saveProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
  }
  
  function createProject() {
    const projectNameInput = document.getElementById('projectName') as HTMLInputElement;
    const projectName = projectNameInput.value.trim();
  
    if (projectName !== '') {
      const newProject: Project = {
        id: projectIdCounter++,
        name: projectName,
      };
  
      projects.push(newProject);
      projectNameInput.value = '';
  
      saveProjectsToLocalStorage();
      displayProjects();
    }
  }
//   delete projects
  function deleteProject(id: number) {
    projects = projects.filter(project => project.id !== id);
    saveProjectsToLocalStorage();
    displayProjects();
  }
  
  function displayProjects() {
    const projectList = document.getElementById('projectList') as HTMLUListElement;
    projectList.innerHTML = '';
  
    projects.forEach(project => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span>${project.name}</span>
        <button onclick="deleteProject(${project.id})">Delete</button>
      `;
      projectList.appendChild(listItem);
    });
  }
  
  displayProjects();
  