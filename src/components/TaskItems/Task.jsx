import React, { useState } from 'react';
import axios from 'axios';
import handleApiResponse from '../../utils/handleApiResponse';

const Task = ({ task, onDelete, onEdit }) => {
  const [isCompleted, setIsCompleted] = useState(task?.completed || false);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
    onEdit({ ...task, completed: !isCompleted });
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/tasks/${task.id}`);
      onDelete(task.id);
      handleApiResponse(response.status, 'Tarea eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      handleApiResponse(error.response.status, 'Error al eliminar la tarea');
    }
  };

  if (!task) {
    return null;
  }

  return (
    <div>
      <h3 style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>{task.title}</h3>
      <p>{task.description}</p>
      <p>Fecha límite: {task.dueDate}</p>
      <input type="checkbox" checked={isCompleted} onChange={handleCheckboxChange} />
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default Task;