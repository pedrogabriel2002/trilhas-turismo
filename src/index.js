const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Destino = require("./model/Destino");
const port = process.env.YOUR_PORT || process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const uri = "mongodb+srv://pgsilva2002:trilhasinova@cluster0.nsscd.mongodb.net/?appName=Cluster0";
mongoose.set('strictQuery', true)
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.get("", async (req, res) => {
  await Destino.find({})
    .then((destinos) => {
      res.render("index", { destinos: destinos });
    })
    .catch((error) => {
      res.render("error", { error: error });
    });
});

app.get("/pesquisar", async (req, res) => {
  console.log(req.query)
  await Destino.find({
    nome: { $regex: new RegExp(req.query.nome), $options: 'i' }
})
    .then((destinos) => {
      res.render("index", { destinos: destinos });
    })
    .catch((error) => {
      res.render("error", { error: error });
    });
});

app.listen(port, () => {
  console.log("Server is up on port", port);
});
