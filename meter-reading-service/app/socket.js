class SocketInit {
    static _instance;

    socketIo;

    constructor(io) {
        this.socketIo = io;
        this.socketIo.on("connection", (socket) => {
            console.log("Client connected");
        });
        SocketInit._instance = this;
    }

    static getInstance() {
        return SocketInit._instance;
    }

    publishEvent(event, data) {
        this.socketIo.emit(event, data);
    }
}

module.exports = SocketInit
