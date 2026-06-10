const express = require('express');
const cors = require('cors');
const pool = require('./conexion');

const app = express();

app.use(cors());
app.use(express.json());


app.get('/camisas', async (req, res) => {

    try {

        const [filas] =
        await pool.query(
            'SELECT * FROM camisas'
        );

        res.json(filas);

    } catch (error) {

        console.log(error);

        res.status(500).send('Error');

    }

});


app.post('/camisas', async (req, res) => {

    try {

        const {
            Equipo,
            Talla,
            Temporada,
            Precio,
            Stock,
            Imagen
        } = req.body;

        await pool.query(

            `
            INSERT INTO camisas
            (
                Equipo,
                Talla,
                Temporada,
                Precio,
                Stock,
                Imagen
            )
            VALUES (?,?,?,?,?,?)
            `,

            [
                Equipo,
                Talla,
                Temporada,
                Precio,
                Stock,
                Imagen
            ]

        );

        res.send('Camisa agregada');

    } catch (error) {

        console.log(error);

        res.status(500).send('Error');

    }

});



app.put('/camisas/:id', async (req, res) => {

    try {

        const id = req.params.id;

        const {
            Equipo,
            Talla,
            Temporada,
            Precio,
            Stock
        } = req.body;

        await pool.query(

            `
            UPDATE camisas
            SET
            Equipo=?,
            Talla=?,
            Temporada=?,
            Precio=?,
            Stock=?
            WHERE id=?
            `,

            [
                Equipo,
                Talla,
                Temporada,
                Precio,
                Stock,
                id
            ]

        );

        res.send('Camisa actualizada');

    } catch (error) {

        console.log(error);

        res.status(500).send('Error');

    }

});



app.delete('/camisas/:id', async (req, res) => {

    try {

        const id = req.params.id;

        await pool.query(

            'DELETE FROM camisas WHERE id=?',

            [id]

        );

        res.send('Camisa eliminada');

    } catch (error) {

        console.log(error);

        res.status(500).send('Error');

    }

});



app.get('/estadisticas', async (req, res) => {

    try {

        const [productos] =
        await pool.query(
            'SELECT COUNT(*) AS total FROM camisas'
        );

        const [stock] =
        await pool.query(
            'SELECT SUM(Stock) AS stockTotal FROM camisas'
        );

        res.json({

            productos:
            productos[0].total,

            stock:
            stock[0].stockTotal

        });

    } catch (error) {

        console.log(error);

        res.status(500).send('Error');

    }

});



app.get('/camisas/:id', async (req, res) => {

    try {

        const id = req.params.id;

        const [filas] =
        await pool.query(

            'SELECT * FROM camisas WHERE id=?',

            [id]

        );

        if (filas.length === 0) {

            return res
            .status(404)
            .send('No encontrada');

        }

        res.json(filas[0]);

    } catch (error) {

        console.log(error);

        res.status(500).send('Error');

    }

});


app.listen(3000, () => {

    console.log(
        'Servidor corriendo en http://localhost:3000'
    );

});