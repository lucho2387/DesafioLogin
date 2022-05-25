const express = require('express')
const cookieParser = require("cookie-parser")
const handlebars = require('express-handlebars')
const path =  require('path')
const morgan = require('morgan')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require("connect-mongo")

const advancedOptions = {
    useNewUrlParser: true,
    useunifiedTopology: true
}

const Producto = require('./models/Producto')
const Usuario = require('./models/Usuario')

// Inicializacion
const app = express()
require('./config/passport')

// Configuraciones
app.set('port', process.env.PORT || 8080)
app.set("views", path.join(__dirname, "views"));

// Motor de Plantilla (Handlebars)
app.engine(
    ".hbs",
    handlebars.engine({
      defaultLayout: "main",
      layoutsDir: path.join(app.get("views"), "layouts"),
      partialsDir: path.join(app.get("views"), "partials"),
      extname: ".hbs",
    })
  );
  app.set("view engine", ".hbs");

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://luis:coderhouse@cluster0.9xnml.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: advancedOptions,
        ttl: 60
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30000
    }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Variables Globales
app.use((req, res, next) => {
  res.locals.mensaje = req.flash('mensaje')
  res.locals.error = req.flash('error')
  // res.locals.error = req.flash('error')
  res.locals.user = req.user || null;
  next()
})

app.get('/productos', async (req, res) => {
  if(req.session){
    const user = req.user
    const usuario = await Usuario.findById(user).lean()
    const productos = await Producto.find().lean()
    res.render('products/list-products', {usuario, productos})
  }else {
    res.render('/users/login')
  }
})

// app.get('/usuario/salir', (req, res) => {
//     // req.session.destroy(err => {
//     //     if(!err) res.redirect('/usuario/login')
//     //     else res.send({status: 'Logout ERROR', body: err})
//     // })
//     req.logout()
//     req.flash('mensaje', 'Session cerrada correctamente')
//     res.redirect('/usuario/login')
// })


// Rutas
app.use(require('./routes/index.routes'))
app.use(require('./routes/productos.routes'))
app.use(require('./routes/usuarios.routes'))

// Archivos Estaticos
app.use(express.static(path.join(__dirname, "public")));

module.exports = { app }
