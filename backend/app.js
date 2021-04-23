const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv/config");

const Cliente = require("./models/cliente");
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
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
//   next();
// })

const clientes = [
  {
    id: "1",
    nome: "José",
    fone: "11223344",
    email: "jose@email.com",
  },
  {
    id: "2",
    nome: "Maria",
    fone: "77889900",
    email: "maria@email.com",
  },
  {
    id: "3",
    nome: "Jaqueline",
    fone: "44774477",
    email: "jaque@email.com",
  },
];

// app.use((req, res, next) => {
//   console.log ("Chegou uma requisição");
//   next();
// })

app.get("/api/clientes", (req, res, next) => {
  Cliente.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      clientes: documents,
    });
  });
});

app.post("/api/clientes", (req, res) => {
  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email,
  });
  cliente.save().then((clienteInserido) => {
    res.status(201).json({
      mensagem: "Cliente inserido",
      id: clienteInserido._id,
    });
  });
});

app.delete("/api/clientes/:id", (req, res, next) => {
  Cliente.deleteOne({ _id: req.params.id }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "Cliente removido" });
  });
});

module.exports = app;
