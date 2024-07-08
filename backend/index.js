const express = require('express');
const cors = require('cors');
const {sequelize} = require('./models');
const itemRoutes = require('./routes/items');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/items', itemRoutes);

// Sync database and start server
sequelize.sync({force: false}).then(() => {
    console.log('Database synced');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error('Unable to sync database:', error);
})
