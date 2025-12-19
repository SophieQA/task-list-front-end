import TaskList from './components/TaskList.jsx';
import './App.css';
import NewTaskForm from './components/NewTaskForm.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

// const TASKS = [
// {
//   id: 1,
//   title: 'Mow the lawn',
//   isComplete: false,
// },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const baseURL = 'http://127.0.0.1:5000';

const getAllTasksFromAPI = () => {
  return axios.get(`${baseURL}/tasks`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching tasks:', error);
      return [];
    });
};

const convertTaskFromAPI = (apiTask) => {
  const { id, title, description, is_complete: isComplete } = apiTask;
  const newtask = {
    id,
    title,
    description,
    isComplete,
  };
  return newtask;
};

const completeTaskApi = id => {
  return axios.patch(`${baseURL}/tasks/${id}/mark_complete`)
    .catch((error) => {
      console.error(`Error marking task ${id} as complete:`, error);
    });
};

const inCompleteTaskApi = id => {
  return axios.patch(`${baseURL}/tasks/${id}/mark_incomplete`)
    .catch((error) => {
      console.error(`Error marking task ${id} as incomplete:`, error);
    });
};

const deleteTaskApi = id => {
  return axios.delete(`${baseURL}/tasks/${id}`)
    .catch((error) => {
      console.error(`Error deleting task ${id}:`, error);
    });
};

const addTaskAPI = (newTask) => {
  return axios.post(`${baseURL}/tasks`, newTask)
    .catch(error => console.log(error));
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  const getAllTasks = () => {
    return getAllTasksFromAPI()
      .then(tasks => {
        const apiTasks = tasks.map(convertTaskFromAPI);
        setTasks(apiTasks);
      });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  // Toggle a task's completion state. This function decides whether to call the
  // API to mark complete or incomplete based on the current task state, and
  // performs an optimistic UI update.
  const toggleTaskComplete = (id) => {
    setTasks((prevTasks) => {
      const task = prevTasks.find((t) => t.id === id);
      if (!task) return prevTasks;

      const willBeComplete = !task.isComplete;

      // optimistic UI update
      const next = prevTasks.map((t) =>
        t.id === id ? { ...t, isComplete: willBeComplete } : t
      );

      // fire-and-forget API call (errors are logged in the helper)
      if (willBeComplete) {
        completeTaskApi(id);
      } else {
        inCompleteTaskApi(id);
      }

      return next;
    });
  };

  const deleteTask = (id) => {
    return deleteTaskApi(id)
      .then(() => {
        setTasks(prevTasks =>
          prevTasks.filter(task => task.id !== id)
        );
      });
  };

  const onHandleSubmit = (data) => {
    return addTaskAPI(data)
      .then((result) => {
        return setTasks((prevTasks) => [convertTaskFromAPI(result.data), ...prevTasks]);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={tasks}
            toggleTaskComplete={toggleTaskComplete}
            deleteTask={deleteTask}
          />
          <NewTaskForm onHandleSubmit={onHandleSubmit} />
        </div>
      </main>
    </div>
  );
};

export default App;
