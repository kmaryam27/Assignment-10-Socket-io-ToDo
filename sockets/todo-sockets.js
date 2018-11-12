module.exports = function(io) {
    io.on('connection', (socket) => {
      
        socket.on('new-task', (data) => {
            io.emit('emit-task', data);
        });

    });
  }



