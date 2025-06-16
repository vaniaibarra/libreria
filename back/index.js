const express = require('express');
const app = express();
const cors = require('cors')
const { pool } = require('./db/database.js')
const librosRoutes = require('./routes/librosRoutes.js')
const path = require('path')

app.listen(3000, () => console.log('SERVER ON'))

app.use(express.json());

app.use(cors());

app.use('/libreria', librosRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
