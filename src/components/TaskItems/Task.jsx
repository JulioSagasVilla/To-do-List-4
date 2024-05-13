import React, { useState } from 'react';

const Task = ({ task, onDelete, onEdit }) => {
  const [isCompleted, setIsCompleted] = useState(task?.completed || false);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
    onEdit({ ...task, completed: !isCompleted });
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
      <button onClick={() => onDelete(task.id)}>Eliminar</button>
    </div>
  );
};

export default Task;