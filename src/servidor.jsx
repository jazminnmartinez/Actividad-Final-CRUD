const URL = 'http://localhost:3000/clientes';

export const obtenerClientes = async () => {
  const res = await fetch(URL);
  return await res.json();
};

export const crearCliente = async (datos) => {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  return await res.json();
};

export const actualizarCliente = async (id, datos) => {
  const res = await fetch(`${URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  return await res.json();
};

export const eliminarCliente = async (id) => {
  await fetch(`${URL}/${id}`, {
    method: 'DELETE'
  });
};
