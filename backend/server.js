const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
const tasks = [
  { id: 1, title: 'Tarea 1', description: 'Descripción de la tarea 1', dueDate: '2023-06-01', completed: false },
  { id: 2, title: 'Tarea 2', description: 'Descripción de la tarea 2', dueDate: '2023-06-15', completed: false },
];

// Obtener todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Obtener una tarea por ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

// Crear una nueva tarea
app.post('/tasks', (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title || !description || !dueDate) {
    res.status(400).json({ error: 'Faltan campos obligatorios' });
  } else {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      dueDate,
      completed: false,
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
  }
});

// Actualizar una tarea existente
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, dueDate, completed } = req.body;

  const task = tasks.find(task => task.id === taskId);

  if (task) {
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.completed = completed !== undefined ? completed : task.completed;

    res.json(task);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

// Eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1);
    res.json(deletedTask[0]);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

// Iniciar el servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});