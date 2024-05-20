import React, { useState } from 'react';
import axios from 'axios';
import handleApiResponse from '../utils/handleApiResponse';

const TaskEditForm = ({ task, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedTask = {
        title,
        description,
        dueDate,
        completed: task?.completed || false,
      };

      const response = await axios.put(`http://localhost:5000/tasks/${task.id}`, updatedTask);
      const updatedTaskFromBackend = response.data;

      onUpdate(updatedTaskFromBackend);
      handleApiResponse(response.status, 'Tarea actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      handleApiResponse(error.response.status, 'Error al actualizar la tarea');
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
      <button type="submit">Guardar cambios</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
};

export default TaskEditForm;