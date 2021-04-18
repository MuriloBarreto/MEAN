const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const Cliente = require("./models/cliente");

mongoose
  .connect(
    "mongodb+srv://user_mtest:268450@cluster0.k8lca.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
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

app.get('/api/clientes', (req, res, next) => {
  Cliente.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      clientes: documents
    });
  })
});

app.post("/api/clientes", (req, res) => {
  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email,
  });
  cliente.save();
  console.log(cliente);
  res.status(201).json({ mensagem: "Cliente inserido" });
});

app.delete("/api/clientes/:id", (req, res, next) => {
  console.log(req.params);
  res.status(200).end();
});

module.exports = app;
