//inicialização do  banco de dados 

(async () => {
    
    const database = require('./db');

    try {
        const resultado = await database.sync();

        console.log("tudo certo ")
    } catch (error) {
        console.log("Erro na criação do banco de dados");
    }
})();