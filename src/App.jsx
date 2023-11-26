import { useState } from "react";

import SideBar from "./components/SideBar";
import NewProject from "./components/NewProject";
import NoProjects from "./components/NoProjects";
import SelectedProject from "./components/SelectedProject";

export default function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectID: undefined,
    projects: [],
    tasks: [],
  });

  function startAddProjectHandler() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: null,
      };
    });
  }

  function newProjectHandler(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevState,
        selectedProjectID: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function selectedProjectHandler(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: id,
      };
    });
  }

  function deleteProjectHandler() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectID,
        ),
      };
    });
  }

  function addTaskHandler(text) {
    setProjectsState((prevState) => {
      const taskID = Math.random();
      const newTask = {
        text: text,
        projectID: prevState.selectedProjectID,
        id: taskID,
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function deleteTaskHandler(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function cancelHandler() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: undefined,
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectID,
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={deleteProjectHandler}
      tasks={projectsState.tasks}
      onAddTask={addTaskHandler}
      onDeleteTask={deleteTaskHandler}
    />
  );

  if (projectsState.selectedProjectID === null) {
    content = (
      <NewProject onAddProject={newProjectHandler} onCancel={cancelHandler} />
    );
  } else if (projectsState.selectedProjectID === undefined) {
    content = <NoProjects onStartAddProject={startAddProjectHandler} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        onStartAddProject={startAddProjectHandler}
        projects={projectsState.projects}
        onSelectProject={selectedProjectHandler}
        selectedProjectID={projectsState.selectedProjectID}
      />
      {content}
    </main>
  );
}
