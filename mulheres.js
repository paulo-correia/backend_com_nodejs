const express = require("express");

const router = express.Router();

// Era utilizado o UUID para gerar um ID
//const { v4: uuidv4 } = require("uuid");

const cors = require("cors");

const conectaBancoDeDados = require("./bancoDeDados");
conectaBancoDeDados();

const Mulher = require("./mulherModel");


const app = express();

app.use(express.json());

app.use(cors());

const porta = 3333;

const mulheres = [
    {
        id: "1",
        nome: "Simara Conceição",
        imagem: "https://github.com/simaraconceicao.png",
        minibio: "Desenvolvedora e Instrutora"
    },
    {
        id: "2",
        nome: "Iana Chan",
        imagem: "",
        minibio: "Fundadora do Programaria"
    }
];

// Método GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindaDoBancoDeDados = await Mulher.find();
        response.json(mulheresVindaDoBancoDeDados);
    }catch(erro){
        console.log(erro);
    }

    // Retornava o Array Mulheres
    // response.json(mulheres);
}

// Método POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        //id: uuidv4(),  // Aqui era utilizado o UUID
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    });

    try {
        const mulherCriada = await novaMulher.save();
        response.status(201).json(mulherCriada);
    } catch(erro) {
        console.log(erro);
    }

    // Colocava os dados do body no Array Mulheres
    //mulheres.push(novaMulher);

    // Retornava o Array Mulheres
    //response.json(mulheres);
}

// Método PATCH
async function corrigeMulher(request, response) {

    // Fazia a procura no Array Mulheres
    //function encontraMulher(mulher) {
    //    if (mulher.id === request.params.id) {
    //        return mulher;
    //    }
    //}

    try {
        const mulherEncontrada = await Mulher.findById(request.params.id);

        if (request.body.nome) {
            mmulherEncontrada.nome = request.body.nome;
        }

        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem;
        }

        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio;
        }

        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao;
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save();

        response.json(mulherAtualizadaNoBancoDeDados);

    } catch(erro) {
        console.log(erro);
    }

    // Encontrava dentro do Array Mulheres
    //const muherEncontrada = mulheres.find(encontraMulher);

    // Consistencia para Alteração
    //if (request.body.nome) {
    //    muherEncontrada.nome = request.body.nome;
    //}

    // Consistencia para Alteração
    //if (request.body.imagem) {
    //    muherEncontrada.imagem = request.body.imagem;
    //}

    // Consistencia para Alteração
    //if (request.body.minibio) {
    //    muherEncontrada.minibio = request.body.minibio;
    //}

    // Retornava o Array Mulheres
    //response.json(mulheres);
    
}

// Método DELETE
async function deletaMulher(request, response) {
    
    // Removia o id do Array Mulheres
    //function todasMenosEla(mulher) {
    //    if (mulher.id !== request.params.id) {
    //        return mulher;
    //    }
    //}

    try {
        await Mulher.findByIdAndDelete(request.params.id);

        response.json({message:"Mulher deletada com sucesso!"});
    } catch(erro) {
        console.log(erro);
    }

    // Filtro para o Array Mulheres
    //const mulheresQueFicaram = mulheres.filter(todasMenosEla);

    // Retorna o Array 
    //response.json(mulheresQueFicaram);

}

function mostraPorta() {
    console.log('Servidor criado e rodando na porta ', porta);
}

app.use(router.get("/mulheres", mostraMulheres));

app.use(router.post("/mulheres", criaMulher));

app.use(router.patch("/mulheres/:id", corrigeMulher));

app.use(router.delete("/mulheres/:id", deletaMulher));

app.listen(porta, mostraPorta);