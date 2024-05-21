const io = require('socket.io')(3000,{//imports the socket.io library and initializes a new Socket.IO server that listens on port 3000.
    cors: {// allow connections from any origin. any client can connect to this Socket.IO server 
        origin: "*",
    },
});

io.on('connection',socket=>{//event listener that listens for new client connections to the Socket.IO server.When a new client connects, callback function is executed
    socket.on('group-chat-send', (groupId)=> {//event listener on the socket object to listen for a custom event.when custome event recived ,the callback function is executed with groupId as the argument
        socket.broadcast.emit('group-message',groupId);//broadcasts the 'group-message' event to all connected clients except the one that sent the original 'group-chat-send' event.groupId is passed along with the event,to indicate which group the message belongs to.
    })
})



const socketService = (socket) => {//defines a function named socketService that takes a socket object as an argument.
    socket.on('common-chat-send', ()=> {//sets up an event listener for a custom event called 'common-chat-send'.When this event is received, the callback function broadcasts a 'common-chat' event to all connected clients except the sender.
        socket.broadcast.emit('common-chat');
    })
    socket.on('group-chat-send', (groupId)=> {
        socket.broadcast.emit('group-message',groupId);// again broadcasts the 'group-message' event with the groupId to all connected clients except the sender.
    })
  }

module.exports = socketService


//The io object is a Socket.IO server that listens for connections on port 3000.
//When a client connects, the server listens for 'group-chat-send' events and broadcasts a 'group-message' event to other clients.
//The socketService function adds more event listeners to a socket, handling both 'common-chat-send' and 'group-chat-send' events, broadcasting corresponding events to all clients except the sender.