import React, { useState } from 'react';
import axios from 'axios';
import handleApiResponse from '../utils/handleApiResponse';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTask = {
        title,
        description,
        dueDate,
        completed: false,
      };

      const response = await axios.post('http://localhost:5000/tasks', newTask);
      const createdTask = response.data;

      onAddTask(createdTask);
      handleApiResponse(response.status, 'Tarea creada exitosamente');

      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
      handleApiResponse(error.response.status, 'Error al crear la tarea');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="dueDate">Fecha límite:</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default TaskForm;