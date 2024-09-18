import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, updateTask, taskToEdit, setTaskToEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setName(taskToEdit.name);
      setDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && description) {
      const task = { name, description, completed: false };
      if (taskToEdit) {
        updateTask(taskToEdit.id, task);
      } else {
        addTask(task);
      }
      setName('');
      setDescription('');
      setTaskToEdit(null);
    } else {
      alert('Please fill in both fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
