const db = require("../config/database");

async function addEvento(nome, descricao, dataInicio,dataFim, participantes, modalidade, regiao,instituicao) {
    const client = await db.connect();

    try {
        await client.query("BEGIN");

        const queryText = "INSERT INTO evento(nome, descricao, dataInicio, dataFim, participantes, modalidade, regiao, instituicao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";

        const values = [nome, descricao, dataInicio,dataFim, participantes, modalidade, regiao,instituicao];

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

async function updateEvento(id, nome, descricao, dataInicio,dataFim, participantes, modalidade, regiao,instituicao) {
    const client = await db.connect();

    try {
        await client.query("BEGIN");

        const queryText = "UPDATE evento SET(nome = $2, descricao = $3, dataInicio = $4, dataFim = $5, participantes = $6, modalidade = $7, regiao = $8, instituicao = $9)where id = $1";

        const values = [id, nome, descricao, dataInicio,dataFim, participantes, modalidade, regiao,instituicao];

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

async function deleteEvento(id){
    const client = await db.connect();

    try {
        await client.query("BEGIN");
        
        const queryText = "DELETE from evento where id = $1";

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

async function getEvento(id) {
    const client = await db.connect();
    
    try {
        await client.query("BEGIN");

        const queryText = "SELECT * from evento where id = $1";
        const values = [id];

        const{rows} = await client.query(queryText,values);

        client.query("COMMIT");

        if(rows.length==0){
            throw new Error("Evento não encontrado")
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

async function getEventoCard(id) {
    const client = await db.connect();
    let result;
    try {
        client.query("BEGIN");

        const queryText = "SELECT nome, dataInicio,regiao from evento where id = $1";
        const values = [id];

        const{rows} = await client.query(queryText,values);

        client.query("COMMIT");

        if(rows.length==0){
            throw new Error("Evento não encontrado")
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

async function getEventoAll() {
    const client = await db.connect();
    let result;
    try {
        client.query("BEGIN");

        const queryText = "SELECT * from evento order by id";

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

module.exports = {addEvento,updateEvento,deleteEvento,getEvento,getEventoCard,getEventoAll};