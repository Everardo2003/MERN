require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require("./models/Todo");

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
//ruta para verificar la conexion a mongodb
app.get("/api/check", async (req, res) => {
  try {
    const todos = await Todo.find(); 
    res.json(todos);
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
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });
