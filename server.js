const express = require('express');
const app = express();
const PORT = process.env.Port || 5000 ;
const db = require('./config/db');


//connect database
db();

//Init middleware
app.use(express.json({extended:false}));

//Define routes
app.use('/api/user',require('./routes/api/user'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/product',require('./routes/api/product'));
app.use('/api/order',require('./routes/api/order'));
app.use('/api/category',require('./routes/api/catigory'));
app.use('/api/cart',require('./routes/api/cartManagement'));



app.get('/',(req,res)=>res.send('API Running'))
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`) );

