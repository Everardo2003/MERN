require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usuario = require("./models/Todo");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

app.get('/ping', (req, res) => {
  res.send('Backend conectado 🚀');
});

// GET todos los todos
app.get("/api/check", async (req, res) => {
  try {
    const todos = await usuario.find(); 
    res.json(todos);
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


// Actualizar TODO (corregido)
app.put("/api/check/:id", async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ error: "El nombre es requerido" });
    }

    // ✅ CORRECTO: Usar Todo en lugar de Usuario
    const todoActualizado = await Todo.findByIdAndUpdate(
      req.params.id,
      { nombre },
      { new: true } // devuelve el documento actualizado
    );

    if (!todoActualizado) {
      return res.status(404).json({ error: "Todo no encontrado" });
    }

    res.json(todoActualizado);
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