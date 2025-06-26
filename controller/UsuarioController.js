const e = require('express');
const Usuario = require("../models/Usuario");
const Evento = require("../models/Eventos")
const Feedback = require("../models/Feedback")

// controle de Usuário
async function criarUsuario(nome, senha, email, idade, telefone, cpf, instituicao,cargo) {
    // não está acrescentando cargo ainda, temos que tratar isso
    try {
        // Validação simples
        if (!nome && !senha && !email && !idade && !telefone && !cpf && !instituicao && !cargo) {
            throw new Error("Algum dos dados não foi preenchido.");
        }

        cargo = 0;
        const resultado = await Usuario.addUsuario(nome, senha, email, idade, telefone, cpf, instituicao,cargo); 

        if (!resultado) {
            throw new Error("Falha ao adicionar usuário");
        }

        return resultado;
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw error; // Para propagar o erro para quem chamou a funcao
    }
}

async function deleteUsuario(id) {
    try {
        if(!id)
            throw new Error("Id é obtigatório");

        const resultado = await Usuario.deleteUsuario(id);
        
        return resultado    
    } catch (error) {
        console.error("Error ao apagar usuário",error);
        throw error;
    }
}

async function updadeUsuario(id,nome, senha, email, idade, telefone, cpf, instituicao) {
    try {
        // Validação simples
        if (!id && !nome && !senha && !email && !idade && !telefone && !cpf && !instituicao) {
            throw new Error("Algum dado não foi preenchido");
        }

        const resultado = await Usuario.updateUsuario(id,nome, senha, email, idade, telefone, cpf, instituicao); 

        if (!resultado) {
            throw new Error("Falha ao atualizar usuário");
        }

        return resultado;
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        throw error; // Para propagar o erro para quem chamou a funcao
    }
}

async function getUsuario(id) {
    try {
        // Validação simples
        if (!id) {
            throw new Error("Id é obrigatório");
        }

        const resultado = await Usuario.getUsuario(id); 

        return resultado //dados do usuário;
    } catch (error) {
        console.error("Erro ao buscar especialidade:", error);
        throw error; // Para propagar o erro para quem chamou a funcao
    }
}

async function getUsuarioAll() {
    try {
        const result = await Usuario.getUsuarioAll();// lista de usuário, com os seus dados

        if(!result){
            throw new Error("Falha ao pegar os Usuários");
        }
        return result;
    } catch (error) {
        console.error("Erro ao buscar os usuários:", error);
        throw error; 
    }
}

// fazer Feedback
async function fazerFeedback(id,idEvento,idUsuario,descricao,nota) {
    try {
        // Validação simples
        if (!id && !idEvento && !idUsuario && !descricao && !nota) {
            throw new Error("Algum dos dados não foi preenchido.");
        }

        const resultado = await Feedback.fazerFeedback(id,idEvento,idUsuario,descricao,nota); 

        if (!resultado) {
            throw new Error("Falha ao fazer feedback");
        }

        return resultado;
    } catch (error) {
        console.error("Erro ao fazer feedback:", error);
        throw error; // Para propagar o erro para quem chamou a função
    }
}
// contrlle de Evento

async function criarEvento(nome, descricao, dataInicio,dataFim, participantes, modalidade, regiao,instituicao) {
    try {
        if(!nome && !descricao && !dataInicio && !dataFim && !participantes && !modalidade && !regiao && !instituicao)
            throw new Error("Algum dado não foi preenchido corretamente");

        const resultado = await Usuario.addEvento(nome, descricao, dataInicio,dataFim, participantes, modalidade, regiao,instituicao); 

        if (!resultado) {
            throw new Error("Falha ao adicionar usuário");
        }

        return resultado;    
    } catch (error) {
        
    }
    
}

module.exports = {criarUsuario,getUsuario,getUsuarioAll,deleteUsuario,updadeUsuario,fazerFeedback};