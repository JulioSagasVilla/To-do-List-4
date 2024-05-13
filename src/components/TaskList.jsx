import React, { useState } from 'react';
import Task from './TaskItems/Task';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Tarea 1', description: 'Descripción de la tarea 1', dueDate: '2023-06-01', completed: false },
    { id: 2, title: 'Tarea 2', description: 'Descripción de la tarea 2', dueDate: '2023-06-15', completed: false },
  ]);

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (editedTask) => {
    setTasks(tasks.map((task) => (task.id === editedTask.id ? editedTask : task)));
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <TaskForm onAddTask={handleAddTask} />
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={handleDeleteTask} onEdit={handleEditTask} />
      ))}
    </div>
  );
};

export default TaskList;