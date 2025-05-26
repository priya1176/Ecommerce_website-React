const express = require('express');
const sequelize = require('./database'); 
const CustomerRouter = require('./Router/customer'); 
const ProductRouter = require('./Router/product'); 
const UserRouter = require('./Router/auth');
const CartItem = require('./models/CartItem'); 


const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors('*')); 
app.use(express.json()); 

app.use('/api', ProductRouter);
app.use('/api', CustomerRouter);
app.use('/api', UserRouter);




// Sync database and start server
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
    console.log('Database & tables created!');
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
