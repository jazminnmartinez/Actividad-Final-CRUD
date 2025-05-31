const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./conexion'); 
const clientes = require('./clientes');
const puerto = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());



// Sincronizar modelos con la base de datos
sequelize.sync().then(() => {
    console.log('Base de datos sincronizada');
});

app.listen(puerto, () => {
    console.log(`Servicio iniciado`);
});

// CLIENTES 
app.post('/clientes', async (req, res) => {
 const { nombre, correo, telefono, direccion } = req.body;
    const data = await clientes.create({
        nombre, correo, telefono, direccion 
    });
    res.send(data);
});
app.get('/clientes', async (req, res) => {
    const data = await clientes.findAll();
    res.send(data);
});

app.put('/clientes/:id', async (req, res) => {
 const { nombre, correo, telefono, direccion } = req.body;
    const { id } = req.params;
    const data = clientes.update({
        nombre, correo, telefono, direccion
    }, {
        where: {
            id
        }
    })
    res.send(data);
});
app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const data = await clientes.destroy({ 
        where: {
             id 
            } 
    });
    res.send(data);
});