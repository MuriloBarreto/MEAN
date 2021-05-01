require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const clienteRoutes = require('./rotas/clientes');
app.use(cors());
app.use(express.json());
app.use('/imagens', express.static(path.join("backend/imagens")));


const Cliente = require('./models/cliente');
// const { ConsoleReporter } = require('jasmine');
const user_db = process.env.MONGODB_USER;
const pass_db = process.env.MONGODB_PASSWORD;
const cluster_db = process.env.MONGODB_CLUSTER;
const name_db = process.env.MONGODB_DATABASE;

mongoose
  .connect(
    `mongodb+srv://${user_db}:${pass_db}@${cluster_db}.k8lca.mongodb.net/${name_db}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conexão OK");
  })
  .catch(() => {
    console.log("Conexão NOK");
  });

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH,PUT, DELETE, OPTIONS');
//   next();
// })

app.use ('/api/clientes', clienteRoutes);

module.exports = app;
