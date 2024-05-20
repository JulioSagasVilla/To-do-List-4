import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Task from './TaskItems/Task';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const handleEditTask = async (editedTask) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${editedTask.id}`, editedTask);
      setTasks(tasks.map((task) => (task.id === editedTask.id ? editedTask : task)));
    } catch (error) {
      console.error('Error al editar la tarea:', error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await axios.post('http://localhost:5000/tasks', newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
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