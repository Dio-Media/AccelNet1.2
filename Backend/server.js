// server.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

app.use(express.json());
app.use('/api/profiles', profileRoute)

// Include route files
const usersRoute = require('./routes/users');
const productsRoute = require('./routes/products');

// Use routes
app.use('/users', usersRoute);
app.use('products', productsRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});