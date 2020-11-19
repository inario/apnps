const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var path = require('path')
var Usuario = require('./model/usuario')

app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname,"public")))

app.get('/',function(req,res){
    res.render('index.ejs',{})
})

app.get('/usuarios',function(req,res){
    res.render('usuarios.ejs',{ usuarios:[
        {nome:'Inácio',email:'inacio@hotmail.com'},
        {nome:'Feks',email:'feks@hotmail.com'},
        {nome:'Djabo',email:'dejayabo@hotmail.com'},
    ]})
})

app.get('/add',function(req,res){
    res.render('adiciona.ejs')
})

app.post('/add',function(req,res){
    var usuario = new Usuario({
        nome: req.body.txtNome,
        email: req.body.txtEmail,
        senha: req.body.txtSenha,
        foto: req.body.txtFoto
    })
    usuario.save(function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect('/');
        }
    })
})

app.listen(3000,function(){
    console.log("Conexão Inicializada na porta 3000")
})