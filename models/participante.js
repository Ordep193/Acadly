const db = require("../config/database");

async function addParticipante(nome, senha, email, idade, telefone, cpf, instituicao) {
    const client = await db.connect();

    try {
        await client.query("BEGIN");

        const queryText = "INSERT INTO participante(nome, senha, email, idade, telefone, cpf, instituicao,compareceu) VALUES ($1, $2, $3, $4, $5, $6, $7,$8)";

        const values = [nome, senha, email, idade, telefone, cpf, instituicao,false];

        await client.query(queryText,values);

        await client.query("COMMIT");
        
    } catch (error) {

        await client.query("ROLLBACK")
        console.log(error);
        return false;

    }finally{
        client.release()
    }

    return true;
}

async function updateParticipante(id,nome, senha, email, idade, telefone, cpf, instituicao) {
    const client = await db.connect();

    try {
        await client.query("BEGIN");

        const queryText = "UPDATE participante SET(nome = $1, senha = $2, email = $3, idade = $4, telefone = $5, cpf = $6, instituicao = $7) where id = $8";

        const values = [nome, senha, email, idade, telefone, cpf, instituicao,ID];

        await client.query(queryText,values);

        await client.query("COMMIT");
        
    } catch (error) {

        await client.query("ROLLBACK")
        console.log(error);
        return false;

    }finally{
        client.release()
    }

    return true;
}

async function deleteParticipante(id){
    const client = await db.connect();

    try {
        await client.query("BEGIN");
        
        const queryText = "DELETE from participante where id = $1";

        const values = [id];

        await client.query(queryText,values);

        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        console.log(error);
        return false
    } finally{
        client.release();
    }

    return true;
}

async function getParticipante(id) {
    const client = await db.connect();
    
    try {
        await client.query("BEGIN");

        const queryText = "SELECT * from participante where id = $1";
        const values = [id];

        const{rows} = await client.query(queryText,values);

        client.query("COMMIT");

        if(rows.length==0){
            throw new Error("Participante não encontrado")
        }

        result = rows[0];
    } catch (error) {
        console.log(error);
        return false;
    }finally{
        client.release();
    }

    return result;
}

async function getParticipanteAll() {
    const client = await db.connect();
    let result;
    try {
        client.query("BEGIN");

        const queryText = "SELECT * from participante order by id";

        const{rows} = await client.query(queryText);

        client.query("COMMIT");

        if(rows.length==0){
            throw new Error("Evento não encontrado")
        }

        result = rows;
    } catch (error) {
        console.log(error);
        return false;
    }finally{
        client.release();
    }

    return result;
}

module.exports = {addParticipante,updateParticipante,removeEventListener,getParticipante,getParticipanteAll};