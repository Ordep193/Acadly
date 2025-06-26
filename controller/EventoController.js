const e = require('express')
const Evento = require("../models/Eventos")
const Certificado = require("../models/Certificado")

//mudar para o controller do evento
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

module.exports = {getEvento,getEventoAll}