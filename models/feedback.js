const db = require("../config/database")

async function updateFeedback(id,descricao,nota) {
    const client = await db.connect();

    try {
        await client.query("BEGIN");

        const queryText = "UPDATE feedback SET(descricao = $2, nota = $3)where id = $1";

        const values = [id,descricao,nota];

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

async function deleteFeedback(id){
    const client = await db.connect();

    try {
        await client.query("BEGIN");
        
        const queryText = "DELETE from feedback where id = $1";

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

async function getFeedback(id) {
    const client = await db.connect();
    
    try {
        await client.query("BEGIN");

        const queryText = "SELECT * from feedback where id = $1";
        const values = [id];

        const{rows} = await client.query(queryText,values);

        client.query("COMMIT");

        if(rows.length==0){
            throw new Error("Feedback não encontrado")
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

async function getFeedbackAll(idUsuario) {
    const client = await db.connect();
    let result;
    try {
        client.query("BEGIN");

        const queryText = "SELECT * from feedback order by id where idUsuario = $1";
        const values = [idUsuario]

        const{rows} = await client.query(queryText,idUsuario);

        client.query("COMMIT");

        if(rows.length==0){
            throw new Error("Feedback não encontrado")
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

module.exports = {updateFeedback,deleteFeedback,getFeedback,getFeedbackAll}