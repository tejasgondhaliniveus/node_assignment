const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { default: mongoose } = require('mongoose');
const cors = require('cors')
// aconst { createClient } = require('redis');

const app = express();
app.options('*',cors());
app.use(cors());
app.use(bodyParser.json());  //for application/json content-type
app.use(bodyParser.urlencoded({extended:true})) //for application/x-www-form-urnencoded
require('dotenv').config({path:path.join(__dirname,'.env')});

//routers
const UserRoutes = require('./routes/UserRoutes');
app.use('/',UserRoutes);

const UserTransactionRouter = require('./routes/UserAndTransactionsRoutes');
app.use('/',UserTransactionRouter)

//redis connection
/*
consat redisPort = process.env.REDIS_PORT ||6379;
const client = createClient(redisPort);
console.log(client)
client.on('error', err => console.log('Redis Client Error', err));
*/

//db connection
mongoose.set('debug',true);
mongoose.Promise=global.Promise;
// console.log(mongoose)
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGO_DATABASE,{
useNewUrlParser : true,
useUnifiedTopology:true,
autoIndex:false,
serverSelectionTimeoutMS:5000,
socketTimeoutMS:45000,
family:4
}).then(()=>{
    console.log('Sucessfully connected to database')
}).catch((error)=>{
    console.log('Error while connecting to database. Exiting Now...',error)
})

app.listen(process.env.PORT|3000,()=>{
    console.log("Server listening at port ",process.env.PORT)
})