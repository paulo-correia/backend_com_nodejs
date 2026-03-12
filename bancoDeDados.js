const mongoose = require("mongoose");

require("dotenv").config();

async function conecatBancoDeDados() {

    try {

        console.log("A conexão com db iniciou...");

        await mongoose.connect(process.env.MONGO_URL);

        console.log("Conectado com sucesso");

    } catch (erro) {

        console.log(erro);

    }

}

module.exports = conecatBancoDeDados;
