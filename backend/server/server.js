const express = require('express')
const dotEnv = require('dotenv')
const cors = require('cors')
// const swaggerUi = require('swagger-ui-express')
// const yaml = require('yamljs')
// const swaggerDocs = yaml.load('./swagger.yaml')
const socketio = require('socket.io');
const dbConnection = require('./database/connection')

dotEnv.config()

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
app.use('/api/v1/user', require('./routes/userRoutes'))
app.use('/api/v1/task', require('./routes/taskRoutes'))
app.use('/api/v1/event', require('./routes/eventRoutes'))
app.use('/api/v1/room', require('./routes/roomRoutes'))

// API Documentation
// if (process.env.NODE_ENV !== 'production') {
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
// }

app.get('/', (req, res, next) => {
  res.send('Hello from my Express server v2!')
})

// io.on('connection', function (socket) {
//   console.log('a user connected');
//   socket.on('disconnect', function () {
//     console.log('User Disconnected');
//   });
//   socket.on('example_message', function (msg) {
//     console.log('message: ' + msg);
//   });
// });

// io.listen(8000);
// app.listen(PORT, () => {
//   console.log(`Server listening on http://localhost:${PORT}`)
// })
// ============= socket.io ==============

const io = require("socket.io")(server, {
  // pingTimeout: 60000,
  cors: {
      origin: "http://localhost:3001",
  }
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
}

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
}

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
}

io.on("connection", (socket) => {
  console.log("🚀 Someone connected!");
  // console.log(users);

  // get userId and socketId from client
  socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
  });

  // get and send message
  socket.on("sendMessage", ({ senderId, receiverId, content }) => {

      const user = getUser(receiverId);

      io.to(user?.socketId).emit("getMessage", {
          senderId,
          content,
      });
  });

  // typing states
  socket.on("typing", ({ senderId, receiverId }) => {
      const user = getUser(receiverId);
      console.log(user)
      io.to(user?.socketId).emit("typing", senderId);
  });

  socket.on("typing stop", ({ senderId, receiverId }) => {
      const user = getUser(receiverId);
      io.to(user?.socketId).emit("typing stop", senderId);
  });

  // user disconnected
  socket.on("disconnect", () => {
      console.log("⚠️ Someone disconnected")
      removeUser(socket.id);
      io.emit("getUsers", users);
      // console.log(users);
  });
});