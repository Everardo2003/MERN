const mongoose = require("mongoose");

// Definir esquema
const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: false
  }
}, { timestamps: true });

// Exportar el modelo
module.exports = mongoose.model("usuario" ,UsuarioSchema,"datos");
