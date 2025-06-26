const db = require("../config/database");

async function addUsuario(nome, senha, email, idade, telefone, cpf, instituicao,cargo) {
    const client = await db.connect();

    try {
        await client.query("BEGIN");

        const queryText = "INSERT INTO usuario(nome, senha, email, idade, telefone, cpf, instituicao, cargo) VALUES ($1, $2, $3, $4, $5, $6, $7,$8)";

        const values = [nome, senha, email, idade, telefone, cpf, instituicao,cargo];

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

async function updateUsuario(id,nome, senha, email, idade, telefone, cpf, instituicao) {
    const client = await db.connect();

    try {
        await client.query("BEGIN");

        const queryText = "UPDATE usuario SET(nome = $1, senha = $2, email = $3, idade = $4, telefone = $5, cpf = $6, instituicao = $7) where id = $8";

        const values = [nome, senha, email, idade, telefone, cpf, instituicao,id];

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

async function deleteUsuario(id){
    const client = await db.connect();

    try {
        await client.query("BEGIN");
        
        const queryText = "DELETE from usuario where id = $1";

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

async function getUsuario(id) {
    const client = await db.connect();
    
    try {
        await client.query("BEGIN");

        const queryText = "SELECT * from usuario where id = $1";
        const values = [id];

        const{rows} = await client.query(queryText,values);

        client.query("COMMIT");

        if(rows.length==0){
            throw new Error("usuario não encontrado")
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

async function getUsuarioAll() {
    const client = await db.connect();
    let result;
    try {
        client.query("BEGIN");

        const queryText = "SELECT * from usuario order by id";

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

async function fazerFeedback(id,idEvento,idUsuario,descricao,nota) {
    const client = await db.connect();

    try {
        await client.query("BEGIN");
        const queryText = "INSERT INTO feedback(id,idEvento,idUsuario,descricao,nota) VALUES ($1, $2, $3, $4, $5)"

        const values = [id,idEvento,idUsuario,descricao,nota];
        
        await client.query(queryText,values);
        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        console.log(error);
        return false;
    }finally{
        client.release();
    }
    return true;
}

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

module.exports = {addUsuario,updateUsuario,getUsuario,getUsuarioAll,deleteUsuario,fazerFeedback,addEvento,deleteEvento,updateEvento};