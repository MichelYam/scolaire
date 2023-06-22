const express = require('express')
const app = express()
const server = require('http').createServer(app);
const dotEnv = require('dotenv')
const cors = require('cors')
// const swaggerUi = require('swagger-ui-express')
// const yaml = require('yamljs')
// const swaggerDocs = yaml.load('./swagger.yaml')
const dbConnection = require('./server/database/connection')
const { Server } = require("socket.io");
const helmet = require("helmet")

require('dotenv').config();
const PORT = process.env.PORT || 3001

// Connect to the database
dbConnection()

// Handle CORS issues
app.use(cors())

// Request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(
    helmet({
        contentSecurityPolicy: false,
        frameguard: true
    })
);

// Handle custom routes
app.use('/api/v1/users', require('./server/routes/userRoutes'))
app.use('/api/v1/tasks', require('./server/routes/taskRoutes'))
app.use('/api/v1/events', require('./server/routes/eventRoutes'))
app.use('/api/v1/rooms', require('./server/routes/roomRoutes'));
app.use('/api/v1/messages', require('./server/routes/messageRoutes'))

// API Documentation
// if (process.env.NODE_ENV !== 'production') {
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
// }

app.get('/', (req, res, next) => {
    res.send('Hello from my Express server v2!')
})

// // Socket programming
require("./server/socket/index")

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})
