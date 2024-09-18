import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './Styles.css';

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')));
  const [taskToEdit, setTaskToEdit] = useState(null);

  // useEffect(() => {
  //   const storedTasks = ;
  //   setTasks(storedTasks);
  // }, []);

  useEffect(() => {
    // if (tasks.length!==0)
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => (task.id === id ? { ...updatedTask, id } : task)));
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  return (
    <div className="app">
      <TaskForm addTask={addTask} updateTask={updateTask} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
      <TaskList tasks={tasks} onEdit={setTaskToEdit} onDelete={deleteTask} onToggle={toggleTaskCompletion} />
    </div>
  );
};

export default App;
