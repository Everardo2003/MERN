require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usuario = require("./models/Usuario");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Mensaje para ver si funciona la API
app.get('/', (req, res) => {
  res.send('API funcionando');
});

//Mensaje para ver si el backend esta conectado al servidor
app.get('/api', (req, res) => {
  res.send('Backend conectado');
});

// Obtener todos los usuarios
app.get("/api/check", async (req, res) => {
  try {
    const usuarios = await usuario.find(); 
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE todo por id
app.delete("/api/check/:id", async (req, res) => {
  try {
    const todo = await usuario.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ mensaje: "Elemento no encontrado" });
    }
    res.json({ mensaje: "Elemento eliminado", todo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear NUEVO Usuario
app.post("/api/check", async (req, res) => {
  try {
    const nombre = req.body?.nombre?.trim();

    if (!nombre) {
      return res.status(400).json({ error: "El campo 'nombre' es requerido." });
    }

    const todo = await new usuario({nombre}).save();
    res.status(201).json(todo);

  } catch (err) {
    console.error("Error en POST /api/check:", err.message);
    res.status(500).json({ error: "Error interno en el servidor." });
  }
});


// Actualizar usuario
app.put("/api/check/:id", async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ error: "El nombre es requerido" });
    }

    const usuarioActualizado = await usuario.findByIdAndUpdate(
      req.params.id,
      { nombre },
      { new: true } 
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuarioActualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Conexión a MongoDB y arranque del servidor
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
});