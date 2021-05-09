require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true  },
()=>{
    console.log('DB Connected');
})

const app = express()
app.use(express.json())
app.use('/api',require('./routes/post'))


const port = process.env.PORT && 3001
const server = app.listen(port,()=>{
    console.log(`Server Running on port ${port}`);
})

process.on("UnhandledRejection",(error,promise) => {
    console.log(`Error : ${error}`);
    server.close(()=>process.exit(1))
})