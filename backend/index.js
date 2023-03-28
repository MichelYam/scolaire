const express = require('express')
const dotEnv = require('dotenv')
const cors = require('cors')
// const swaggerUi = require('swagger-ui-express')
// const yaml = require('yamljs')
// const swaggerDocs = yaml.load('./swagger.yaml')
const dbConnection = require('./server/database/connection')
// const io = require('socket.io')(http);

require('dotenv').config();
const app = express()
const PORT = process.env.PORT || 3001

// Connect to the database
dbConnection()

// Handle CORS issues
app.use(cors())

// Request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handle custom routes
app.use('/api/v1/user', require('./server/routes/userRoutes'))
app.use('/api/v1/task', require('./server/routes/taskRoutes'))
app.use('/api/v1/event', require('./server/routes/eventRoutes'))
app.use('/api/v1/room', require('./server/routes/roomRoutes'));

// API Documentation
// if (process.env.NODE_ENV !== 'production') {
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
// }

app.get('/', (req, res, next) => {
    res.send('Hello from my Express server v2!')
})

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//         console.log('message: ' + msg);
//     });
// });