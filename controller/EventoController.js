const e = require('express')
const Evento = require("../models/Eventos")
const Certificado = require("../models/Certificado")

async function getEvento(id) {
    try {
        // Validação simples
        if (!id) {
            throw new Error("Id é obrigatório");
        }

        const resultado = await Evento.getEvento(id); 

        return resultado //dados do evento;
    } catch (error) {
        console.error("Erro ao buscar o evento:", error);
        throw error; // Para propagar o erro para quem chamou a função
    }
}

async function getEventoAll() {
    try {
        const result = await Evento.getEventoAll();// lista de eventos, com os seus dados

        if(!result){
            throw new Error("Falha ao pegar os eventos");
        }
        return result;
    } catch (error) {
        console.error("Erro ao buscar os eventos:", error);
        throw error; 
    }
}

async function notificarUsuario(idUsuario) {
    //tem que implementar
}

async function registrarSubimissao(idUsuario,idEvento) {
    // esse registrar subimissão é de uma participação no evento?

}

async function criarCertificado(idUsuario,idEvento) {
    try {
        evento = await Evento.getEvento(idEvento)
        destricao = "Mensagem generecia de certificado do evento: "+evento.nome;
    } catch (error) {
        console.error("Erro ao buscar os dados do evento:", error);
        throw error;
    }
    
    try {
        const agora = new Date();

        const dia = agora.getDate().toString().padStart(2, '0');
        const mes = (agora.getMonth() + 1).toString().padStart(2, '0'); // mês começa do zero!
        const ano = agora.getFullYear();

        const dataCriacao = `${dia}/${mes}/${ano}`;

        await Certificado.addCertificado(idUsuario,idEvento,destricao,dataCriacao)
        
    } catch (error) {
        console.error("Erro ao buscar os dados do evento:", error);
        throw error;
    }
}

async function emitirCertificado(params,idEvento,idUsuario) {
    try {
        const result = await Certificado.getCertificado(idUsuario,idEvento);

        if(!result){
            throw new Error("Falha ao pegar os eventos");
        }
        return result;
    } catch (error) {
        console.error("Erro ao buscar os eventos:", error);
        throw error; 
    }
}

module.exports = {getEvento,getEventoAll,criarCertificado,emitirCertificado}