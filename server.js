const express = require('express');
const cors = require('cors');
const corsOptions = require('./corsOptions');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes');
const cookieParser = require("cookie-parser");
// Create the admin server
const server = express();

server.use(cors(corsOptions));
server.use(cookieParser());
server.use(bodyParser.json());
server.use('/', adminRoutes);
server.use('/admin/venues', venueRoutes);
server.use('/admin/events', eventRoutes);
server.use('/admin/sports', sportRoutes);

const PORT = process.env.ADMIN_SERVER_PORT || 8802;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
