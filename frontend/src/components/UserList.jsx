import { useEffect, useState } from "react";
import axios from "axios";
import './styles.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [nombre, setNombre] = useState("");
  const [editNombre, setEditNombre] = useState(""); // Nuevo estado para editar
  const [editId, setEditId] = useState(null); // Guardar id en edición

  // Obtener usuarios
  const fetchUsers = async () => {
    try {
      const usuarios = await axios.get("http://localhost:5000/api/check");
      setUsers(usuarios.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Insertar usuario
  const addUser = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/check", { nombre });
      console.log("Usuario agregado:", res.data);
      alert("Se agregó con éxito");
      setNombre("");
      await fetchUsers(); // Actualiza la lista
    } catch (err) {
      console.error("Error adding user:", err);
    } 
  };

  // Actualizar usuario
  const updateUser = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/check/${id}`, { nombre: editNombre });
      setEditId(null); // Quitar modo edición
      setEditNombre("");
      await fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  // Eliminar usuario
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/check/${id}`);
      await fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="principal">
      <h1>CRUD</h1>
      <h2>Lista de Usuarios</h2>

      {/* Formulario para agregar */}
      <div>
        <input className="formulario"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nuevo usuario"
        />
        <button 
          className="boton"
          type="button" 
          onClick={addUser}>
          Agregar
        </button>
      </div>

      {/* Listado */}
      <ul>
        {users.map(user => (
          <li className="lista" key={user._id}>
            {editId === user._id ? (
              <input
                type="text"
                value={editNombre}
                onChange={(e) => setEditNombre(e.target.value)}
              />
            ) : (
              <span>{user.nombre}</span>
            )}
            <div className="botones">
              {editId === user._id ? (
                <button 
                  className="boton-actualizar" 
                  onClick={() => updateUser(user._id)}>
                  Guardar
                </button>
              ) : (
                <button 
                  className="boton-actualizar" 
                  onClick={() => { setEditId(user._id); setEditNombre(user.nombre); }}>
                  Actualizar
                </button>
              )}

              <button 
                className="boton-eliminar" 
                onClick={() => deleteUser(user._id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
