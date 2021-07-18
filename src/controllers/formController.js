const Users = require('../model/Users');
const Event = require('../model/Event');
const Subs = require('../model/Subs');
const Permissions = require('../model/Permissions');
const Authorization = require('../model/Authorization');

const puppeteer = require('puppeteer'); // responsável pela entrega do pdf



 module.exports = {
    //register
    //login 
    
    //created_event

    //show_event_open
    //subscription

    //show_event_concluded
    //print

    createdUser: (req,res) => { //criação novo usuário  get
/*         Users.create({name:'xxxxxxx',email:'xxxxxxx@email.com.br',password:"Não passe a senha por aqui",event:"XXXXX"}).then(()=>{
            res.render('form')
    
        }).catch(err =>{
            res.send(err)
        })  */  
        res.render('registerUser')
     },
    saveUser: (req,res) => { //criação novo usuário post
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password //has
        

        Users.findAll({where:{email:email}}).then(result => {
            //result == array com os dados encontrados no baco de dados
           if(result != 0){ // diferente de zero == já está no banco de dados 
            res.send('esse email já foi registrado ')

           }else{
            Users.create({name:name,email:email,password:password}).then(()=>{
                res.redirect('/login')
            }).catch(err=>{
                console.log(err)
            })}
        }).catch(err=>{
            console.log(err)
        })
     },
    login: (req,res)=>{ //login get
         //pagina para colocar os dados 
         res.render('login')
     },
    loggingIn: (req,res)=>{ //login post //+++++++++++++  correção
          //login
        const email = req.body.email;
        const password = req.body.password;//senha não é segura

        Users.findOne({where:{email:email, password:password}}).then(result => {
        /// tem q refazer essa parte 
        if(result != null){ //usuário existe

            req.session.user = {
                id: result.id,
                email: result.email,
            }
            res.redirect(`/event/${result.id}`) //vai mandar para uma rota com o id do user encontrado

        }else{
            res.redirect('/login')
           
        }

        }).catch(err => {console.log(err)})
     }, 

    show_event_open: (req,res)=>{ //Mostra eventos em aberto
        const idUser = req.params.idUser
        
        Event.findAll().then(result => { //busca eventos no banco de dados
             res.render('listEvents', {result:result, idUser:idUser})
       
        }).catch(err => {console.log(err)})

     },
    subscriptionEvent: (req,res) =>{ //inscrição em evento 
            const idEvent = req.body.Event;
            const idUser = req.body.userMenu;

        Subs.create({code:"00",eventId:idEvent, userId:idUser}).then(()=>{
            res.redirect(`/user/event/${idUser}`)
        }).catch(err =>{})
     },
    redirectMenu: (req,res) =>{ //vai redirecionar Para login ou para meus eventos 
       const idUser = req.body.userMenu
        
       if(idUser.length == 0){ //usuário não tá logado
            res.redirect('/login')
       }else{ 
            res.redirect(`/user/event/${idUser}`) //página com eventos inscritos 
       }
    },
    newEvent:(req,res)=>{
    
        res.render('newEvent'); 
    },
    saveEvent: (req,res) => {  //salva evento criado
       
 
        const name = req.body.name;
        const date = req.body.date;
        const idHours = req.body.idHours;
        const organization = req.body.organization;

        Event.create({name:name, hours:idHours, date:date, organization:organization}).then(()=>{
            res.redirect('/event/');
            
        }).catch(err => {
            res.redirect('/admin/event/new')
        })
        


    },
    showEvent: (req,res) => { // lista os evento inscritos /meus eventos @@@@@ // tem q adicionar segurança nessa rota 
         
        
         const idUser = req.params.idUser

         Subs.findAll({where: {userId: idUser }}).then(Subs => {
             //{include:[{ model: Event}]},
             var idEventSearch = []
             
             Subs.forEach(id =>{  //vai colocar em um array todos os idEvents para pesquisar diretamente no banco de dados dos eventos
                idEventSearch.push(id.eventId);
                 
                })
                //console.log('')
            Event.findAll({where:{id:idEventSearch}}).then(Event => { // vai pesquisar apenas os events q o usuário tá inscrito (idEventSearch foi achado através da pesquisa na tabela subs)
                 
                res.render("userEvents", {Event:Event, Subs: Subs })
                  
            }).catch(err =>{console.log(err)})
 
         }).catch(err => {console.log(err)})

     },
    printCertificate: async (req,res) =>{ //html certificado
  
        const idEventSearch = req.params.idEvent;
        

      
       Subs.findAll({where: {eventId: idEventSearch }}).then(Subs => {
          
        Event.findAll({where:{id:idEventSearch}}).then(Event => { 

        res.render("print", {Event:Event, Subs: Subs });

        }).catch(err =>{console.log(err)})
        }).catch(err => {console.log(err)})
         
    },  
    emitCertificate: async (req,res) =>{ //pdf certificado

        const idEvent = req.params.idEvent;
        
        const browser = await puppeteer.launch() 
        const page = await browser.newPage()
                                                // direciona o endereço  
        await page.goto(`http://localhost:8080/user/event/print/${idEvent}`,{
            waitUntil: 'networkidle0'  // até carregar a página totalmente     
        }) 

        const pdf = await page.pdf({ //vai esperar a página gerar um pdf
            printBackground: true, //vai passar alguns parâmetros para ele colocar no pdf 
            format: 'Letter'
        })
        
        await browser.close();
        
        res.contentType("application/pdf") //vai enviar o pdf para o página. se essa parte estiver comentada o pdf será baixado

        return res.send(pdf)
         
        
    }, 
    permissionsShow:(req,res)=>{ // Página para mostrar todas as permissões criadas
        Permissions.findAll().then(result => {
            res.render('showPermissions', {result:result});
        }).catch(err => {console.log(err)})
    },   
    permissionsNew:(req,res)=>{ // Página criar permissões 
 
        res.render('newPermissions')
    }, 
    permissionsSave:(req,res)=>{ // ROTA POTS criar permissões 
        const permission = req.body.permission;
        const description = req.body.description;

        Permissions.findOne({where:{name:permission}}).then(result => {

        if(result != null){ //Permission já existe
            res.redirect('/admin/permissions/new')
        }else{  
            Permissions.create({name:permission,description:description}).then(result =>{
            res.redirect('/admin/permissions')

            }).catch(err => {console.log(err)})
            }
        }).catch(err =>{console.log(err)})
    },
 } 
 
//adm 
// controle de acesso 
//segurança as senhas
 /*         
        
        Users.findAll({where:{id:idUser}}).then(result =>{
            //console.log(result,"where")

            if(result != null){
                
                res.render('event', {result: result })
               
            }else{
                res.send('Event não encontrado redirecionar para inscrição em evento')
            }
        }).catch(err =>{console.log(err)})
 */



