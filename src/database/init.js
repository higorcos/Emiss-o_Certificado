//inicialização do  banco de dados 

(async () => {
    
    const database = require('./db');
    const Users = require('../model/Users');
    const Event = require('../model/Event');
    const Subs = require('../model/Subs')
    try {
        const resultado = await database.sync();
        const a2 = await Subs.sync();
        const resultadoCreate = await Users.create({
            name: 'mouse',
            email: '@gmail',
            password: '3434fij3fo',
            event: "iiejciejci",
        })
        //console.log(resultadoCreate);
        console.log("tudo certo ")
    } catch (error) {
        console.log("Erro na criação do banco de dados");
    }
})();