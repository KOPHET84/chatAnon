require('dotenv').config();
const port =  process.env.SERVER_PORT||4000;
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
      origin: true, // connection decision
      credentials: true
    }
  });
let connectUser = 0; 
let messages = []; 
let users = {}
const isAdmin ={
  login:process.env.ADMIN_LOGIN,
  password:process.env.ADMIN_PASSWORD,
  adminId:'',
  adminSocket : ''
}

/*io.use((socket, next) => {
  // Obtaining the client's IP address
  const ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
  socket.ip = ip;
  next();
});*/

io.on('connection', (socket) => {
  connectUser++;
  users[socket.id] = connectUser
  console.log(users)
  if(isAdmin.adminId.length>0){
    isAdmin.adminSocket.emit('sendUsers', Object.keys(users));
  }
  io.emit('numbersUsers',connectUser);//number of users
  socket.emit('history', messages); //message history
  
  socket.on('sendMessage', (message) => {
      messages.push(message);
      io.emit('receiveMessage', message); 
      if(isAdmin.adminId.length>0){isAdmin.adminSocket.emit('sendMass', messages);}
  });

  socket.on('deleteMessage', (message) => {
    messages = message ;
   io.emit('deleteMessage', message); 
  });

  socket.on('sendVerify', (mess)=>{// verification
    if(isAdmin.login===mess.login&&isAdmin.password===mess.password&&isAdmin.adminId.length===0){
      socket.emit('backVerify', true, socket.id); 
      isAdmin.adminId = socket.id;
      isAdmin.adminSocket = socket;
      console.log('admin is online')
    }else{socket.emit('backVerify', false)}
  });
  //
  socket.on('returnVerify', ()=>{
    socket.emit('backVerify', false);
    socket.emit('history', messages)
    isAdmin.adminId = '';
    isAdmin.adminSocket ='';
    console.log('admin is offline');
  })

  socket.on('showMessage', ()=>{
    socket.emit('sendMass', messages)
  });

  socket.on('showUsers', ()=>{
    socket.emit('sendUsers', Object.keys(users));
    socket.emit('backVerify', true, socket.id);
  });

  socket.on('removeUser', (userId) => {
    console.log(`Delete: ${userId}`);
    if (users[userId]) {
        io.emit('numbersUsers', connectUser);
        io.to(userId).emit('forceDisconnect');
    } else {
        console.log(`Client ${userId} not found.`);
    }
});

  socket.on('disconnect', () => {
        console.log(socket.id, 'disconnect');
        if(socket.id === isAdmin.adminId){
          isAdmin.adminId = '';
          isAdmin.adminSocket = '';
          console.log('admin is offline')
        }
        delete users[socket.id]
        connectUser--;
        if(isAdmin.adminId.length>0){
          isAdmin.adminSocket.emit('sendUsers', Object.keys(users));
        }
        console.log(users)

    io.emit('numbersUsers',connectUser)
  });
});

httpServer.listen(port,"192.168.1.44", () => {
    console.log(`Server is running on pOrt ${port}`);
});

module.exports = {isAdmin, users, port};

