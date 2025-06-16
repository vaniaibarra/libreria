const express = require('express');
const app = express();
const cors = require('cors')
const { pool } = require('./db/database.js')
const librosRoutes = require('./routes/librosRoutes.js')
const path = require('path')

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SERVER ON en puerto ${PORT}`))

app.use(express.json());

app.use(cors());

app.use('/libreria', librosRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
