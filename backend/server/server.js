const express = require('express')
const dotEnv = require('dotenv')
const cors = require('cors')
// const swaggerUi = require('swagger-ui-express')
// const yaml = require('yamljs')
// const swaggerDocs = yaml.load('./swagger.yaml')
const socketio = require('socket.io');
const dbConnection = require('./database/connection')
const server = http.createServer(app);
const http = require('http');
dotEnv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Connect to the database
dbConnection()

// Handle CORS issues
app.use(cors())

// Request payload middleware
// app.use(express.json())
app.use(express.json({ extended: false }))
app.use(express.urlencoded({ extended: true }))

// Handle custom routes
app.use('/api/v1/users', require('./routes/userRoutes'))
app.use('/api/v1/tasks', require('./routes/taskRoutes'))
app.use('/api/v1/events', require('./routes/eventRoutes'))
app.use('/api/v1/rooms', require('./routes/roomRoutes'))
app.use('/api/v1/messages', require('./routes/messageRoutes'))
// app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/images", express.static("images"));
// API Documentation
// if (process.env.NODE_ENV !== 'production') {
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
// }


// require("./socket/index")

