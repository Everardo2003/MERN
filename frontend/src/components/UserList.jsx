import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (!nombre.trim()) return;
    
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/check", { nombre });
      console.log("Usuario agregado:", res.data);
      setNombre("");
      await fetchUsers(); // Esperar a que se actualice la lista
    } catch (err) {
      console.error("Error adding user:", err);
    } finally {
      setLoading(false);
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

  // Manejar tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      addUser();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Usuarios</h2>

      {/* Formulario para agregar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nuevo usuario"
          disabled={loading}
          style={{ 
            marginRight: '10px', 
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button 
          type="button" 
          onClick={addUser}
          disabled={loading || !nombre.trim()}
          style={{
            padding: '8px 16px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Agregando...' : 'Agregar'}
        </button>
      </div>

      {/* Listado */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map(user => (
          <li key={user._id} style={{
            padding: '10px',
            margin: '5px 0',
            border: '1px solid #eee',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{user.nombre}</span>
            <button 
              onClick={() => deleteUser(user._id)}
              disabled={loading}
              style={{
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;