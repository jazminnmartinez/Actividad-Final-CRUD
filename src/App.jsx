import { useEffect, useState } from 'react';
import './App.css';


import {
  obtenerClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
} from './servidor';

function App() {
  const [clientes, setClientes] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: '',
  });
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = () => {
    obtenerClientes()
      .then(setClientes)
      .catch(() => setMensaje('Error al cargar clientes.'));
  };

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const resetFormulario = () => {
    setFormulario({ nombre: '', correo: '', telefono: '', direccion: '' });
    setEditandoId(null);
    setMensaje('');
  };

  const guardarCliente = async () => {
    try {
      if (editandoId) {
        await actualizarCliente(editandoId, formulario);
        setMensaje('Cliente actualizado correctamente.');
      } else {
        await crearCliente(formulario);
        setMensaje('Cliente creado correctamente.');
      }
      resetFormulario();
      cargarClientes();
    } catch {
      setMensaje('Error al guardar cliente.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    guardarCliente();
  };

  const editarCliente = (cliente) => {
    setFormulario({
      nombre: cliente.nombre,
      correo: cliente.correo,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
    });
    setEditandoId(cliente.id);
    setMensaje('');
  };

  const eliminarClienteHandler = async (id) => {
    if (window.confirm('¿Eliminar cliente?')) {
      try {
        await eliminarCliente(id);
        setMensaje('Cliente eliminado.');
        cargarClientes();
      } catch {
        setMensaje('Error al eliminar cliente.');
      }
    }
  };

  return (
    <div className="contenedor">
      <h1 className="titulo">Clientes</h1>

      {mensaje && <div className="mensaje">{mensaje}</div>}

      <form onSubmit={handleSubmit} className="formulario">
        <input
          className="input"
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="email"
          name="correo"
          placeholder="Correo"
          value={formulario.correo}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={formulario.telefono}
          onChange={handleChange}
        />
        <input
          className="input"
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formulario.direccion}
          onChange={handleChange}
        />
        <button type="submit" className="boton">
          {editandoId ? 'Actualizar Cliente' : 'Agregar Cliente'}
        </button>
        {editandoId && (
          <button
            type="button"
            className="boton botonCancelar"
            onClick={resetFormulario}
          >
            Cancelar
          </button>
        )}
      </form>

     
      <table className="tabla">
   <thead>
    <tr>
      <th className="celdaEncabezado">Nombre</th>
      <th className="celdaEncabezado">Correo</th>
      <th className="celdaEncabezado">Teléfono</th>
      <th className="celdaEncabezado">Dirección</th>
      <th className="celdaEncabezado">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {clientes.length === 0 ? (
      <tr>
        <td colSpan="5" className="celda">No hay clientes registrados.</td>
      </tr>
    ) : (
      clientes.map(cliente => (
        <tr key={cliente.id}>
          <td className="celda">{cliente.nombre}</td>
          <td className="celda">{cliente.correo}</td>
          <td className="celda">{cliente.telefono}</td>
          <td className="celda">{cliente.direccion}</td>
          <td className="celda">
            <button className="botonAccion" onClick={() => editarCliente(cliente)}>Editar</button>
            <button
              className="botonAccion botonEliminar"
              onClick={() => eliminarClienteHandler(cliente.id)}

            >
              Eliminar
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

    </div>
  );
}

export default App;
