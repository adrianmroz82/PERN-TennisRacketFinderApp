require('dotenv').config();

const { query } = require('express');
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

// const morgan = require('morgan');
// app.use(morgan('dev'));
//middleware, access to req res
//middleware must be told to pass request to (next) middleware (https requests)

app.use(cors());
app.use(express.json());

// GET ALL RACKETS
app.get('/api/v1/rackets', async (req, res) => {
  try {
    const results = await db.query('select * from rackets');

    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        // racket: ['Wilson', 'Head'],
        rackets: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// GET A SINGLE RACKET
app.get('/api/v1/rackets/:id', async (req, res) => {
  console.log(req.params.id);

  try {
    const results = await db.query('select * from rackets where id = $1', [
      req.params.id,
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        rackets: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// CREATE A RACKET

// psql insert into doesnt automatically return data (INSERT 0 1)
// [rows] is empty
// to show output use returning * / returning id / returning brand / etc
app.post('/api/v1/rackets', async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      'INSERT INTO rackets (brand, model, price, on_sale) values ($1, $2, $3, $4) returning *',
      [req.body.brand, req.body.model, req.body.price, req.body.on_sale]
    );
    console.log(results);
    res.status(201).json({
      status: 'Success',
      data: {
        // only first one will be returned
        rackets: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// UPDATE RACKETS
// UPDATE racketsSET name = 'new_brand_here', price = 'new_value', etc where id = id_number;
app.put('/api/v1/rackets/:id', async (req, res) => {
  try {
    const results = await db.query(
      'UPDATE rackets SET brand = $1, model = $2, price = $3, on_sale = $4 where id = $5 returning *',
      [
        req.body.brand,
        req.body.model,
        req.body.price,
        req.body.on_sale,
        req.params.id,
      ]
    );
    console.log(results);
    res.status(200).json({
      status: 'Success',
      data: {
        rackets: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// DELETE
// DELETE FROM rackets where id = ex.8;

app.delete('/api/v1/rackets/:id', async (req, res) => {
  try {
    const results = await db.query('DELETE FROM rackets where id = $1', [
      req.params.id,
    ]);
    console.log(results);
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`server runs at ${port}`);
});
