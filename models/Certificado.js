const db = require("../config/database")

async function deleteCertificado(id){
    const client = await db.connect();

    try {
        await client.query("BEGIN");
        
        const queryText = "DELETE from certificado where id = $1";

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

async function getCertificado(id) {
    const client = await db.connect();
    
    try {
        await client.query("BEGIN");

        const queryText = "SELECT * from certificado where id = $1";
        const values = [id];

        const{rows} = await client.query(queryText,values);

        client.query("COMMIT");

        if(rows.length==0){
            throw new Error("Certificado não encontrado")
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

async function getCertificadoAll(idUsuario) {
    const client = await db.connect();
    let result;
    try {
        client.query("BEGIN");

        const queryText = "SELECT * from certificado order by id where idUsuario = $1";
        const values = [idUsuario]

        const{rows} = await client.query(queryText,idUsuario);

        client.query("COMMIT");

        if(rows.length==0){
            throw new Error("Certificado não encontrado")
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

module.exports = {deleteCertificado,getCertificado,getCertificadoAll}