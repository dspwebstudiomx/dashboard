// ...código existente...
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Project = require('./models/Project'); // Asegúrate de tener este modelo
app.use(express.json());

// Endpoint para marcar un proyecto como terminado
app.patch('/api/proyectos/:id/completar', async (req, res) => {
  try {
    const { id } = req.params;
    const proyecto = await Project.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );
    if (!proyecto) {
      return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el proyecto' });
  }
});

// ...código existente...