const mongoose = require("mongoose");

// Definir esquema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  
}, { timestamps: true });

// Exportar el modelo
module.exports = mongoose.model("Todo" ,todoSchema,"datos");
