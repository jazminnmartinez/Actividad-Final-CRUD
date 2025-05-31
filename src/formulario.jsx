import { useEffect, useState } from 'react';

function Formulario({ onGuardar, clienteActual, onCancelar }) {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: '',
  });

  useEffect(() => {
    if (clienteActual) {
      setForm(clienteActual);
    } else {
      setForm({ nombre: '', correo: '', telefono: '', direccion: '' });
    }
  }, [clienteActual]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{clienteActual ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
      <input name="correo" value={form.correo} onChange={handleChange} placeholder="Correo" required />
      <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" required />
      <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" required />
      <button type="submit">{clienteActual ? 'Actualizar' : 'Crear'}</button>
      {clienteActual && <button type="button" onClick={onCancelar}>Cancelar</button>}
    </form>
  );
}

export default Formulario;
