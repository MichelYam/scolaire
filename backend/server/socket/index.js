const io = require("socket.io")(8900, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});
let users = [];

const addUser = (userId, socketId) => {
  if (users.some((user) => user.userId === userId)) {
    console.log("Object found inside the array.");
  } else {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user._id === userId._id);
};

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    socket.emit("connected");
  });
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log("users", users);
    io.emit("getUsers", users);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    let room = newMessageRecieved.room;

    if (!room.users) return console.log("room not defined");

    room.users.forEach((user) => {
      if (user._id == newMessageRecieved.senderId) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  // user disconnected
  socket.on("disconnect", () => {
    console.log("⚠️ Someone disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
    // console.log(users);
  });
  // socket.off("setup", () => {
  //   console.log("USER DISCONNECTED");
  //   socket.leave(userData._id);
  // });
});
