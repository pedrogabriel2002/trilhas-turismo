const mongoose = require('mongoose');

const destinoSchema = new mongoose.Schema({
    nome: String,
    imagem: String,
    descricao: String,
    atrativos: String,
    coordx: String,
    coordy: String,
});

const Destino = mongoose.model('Destino', destinoSchema);

module.exports = Destino;