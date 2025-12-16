import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState } from 'react';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [nowTasks, setNowTasks] = useState(TASKS);



  const taskComplete = (taskId) => {
    const tasks = nowTasks.map(task => {
      if (task.id === taskId) {
        return {...task, isComplete: ! task.isComplete};
      } else {
        return task;
      }
    });
    setNowTasks(tasks);
  };

  const deleteTasks = (taskId) => {
    const tasks = nowTasks.filter(task => task.id !== taskId);
    setNowTasks(tasks);
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <TaskList
          tasks={nowTasks}
          onTaskCompleteToggle={taskComplete}
          onDeleteTask={deleteTasks}
        ></TaskList>
      </main>
    </div>
  );
};

export default App;
