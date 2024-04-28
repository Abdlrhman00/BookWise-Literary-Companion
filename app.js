const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
//const fs = require('fs');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended : false }));

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'views')));
app.use('/controllers', express.static(path.join(__dirname, 'controllers')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/photos', express.static(path.join(__dirname, 'photos')));



const admin = require('./routers/admin');
const login = require('./routers/login');
const home = require('./routers/visitor');
const user = require('./routers/user');


//routes
//app.use('/',home);
app.use('/',user);
app.use('/log', login);

//app.use('/admin',admin);



//app.use('/admin', admin);

//app.use('/:userID', user);

app.listen(process.env.PORT,()=>console.log('app is running'));