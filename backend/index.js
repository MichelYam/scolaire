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


require('dotenv').config();
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
app.use('/api/v1/message', require('./server/routes/messageRoutes'))

// API Documentation
// if (process.env.NODE_ENV !== 'production') {
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
// }

app.get('/', (req, res, next) => {
    res.send('Hello from my Express server v2!')
})

// // Socket programming
const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});
let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });
    });

    //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})
