import { useEffect, useState } from "react";
import axios from "axios";
import './styles.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [nombre, setNombre] = useState("");

  // Obtener usuarios
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/check");
      setUsers(res.data);
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
      alert("Se agrego con exito");
      setNombre("");
      await fetchUsers(); // Esperar a que se actualice la lista
    } catch (err) {
      console.error("Error adding user:", err);
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
    <div>
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
            <span>{user.nombre}</span>
            <button className="boton-eliminar" 
              onClick={() => deleteUser(user._id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;