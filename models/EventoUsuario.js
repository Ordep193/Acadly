const db = require("../config/database")

async function addUsuarioEvento(idUsuario,idEvento,comparecer) {
    const client = await db.connect();

    try {
        await client.query("BEGIN");

        const queryText = "INSERT INTO evento_usuario(idUsuario,idEvento,comparecer) VALUES ($1, $2, $3)";

        const values = [idUsuario,idEvento,comparecer];

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

async function gerenciarPresenca(idEvento,idUsuario,comparecer) {
    const client = await db.connect();

    try {
        await client.query("BEGIN");

        const queryText = "UPDATE evento_usuario SET comparecer = $1 where idUsuario = $2 and idEvento = $3";

        const values = [comparecer,idUsuario,idEvento];

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

async function getPresenca(idUsuario,idEvento) {
    const client = await db.connect();
    
    try {
        await client.query("BEGIN");

        const queryText = "SELECT * from evento_usuario where idUsuario = $1 and idEvento = $2";
        const values = [idUsuario,idEvento];

        const{rows} = await client.query(queryText,values);

        await client.query("COMMIT");

        if(rows.length==0){
            throw new Error("Presença não encontrado")
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

module.exports = {addUsuarioEvento,gerenciarPresenca,getPresenca}