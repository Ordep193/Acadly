const db = require("../config/database");

async function addUsuario(nome, senha, email, idade, telefone, cpf, instituicao) {
    const client = await db.connect();

    try {
        await client.query("BEGIN");

        const queryText = "INSERT INTO usuario(nome, senha, email, idade, telefone, cpf, instituicao,compareceu) VALUES ($1, $2, $3, $4, $5, $6, $7,$8)";

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

module.exports = {addUsuario,updateUsuario,getUsuario,getUsuarioAll,deleteUsuario};