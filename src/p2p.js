const WebSocket = require("ws");//socket is connection between server

const sockets = [];
//p2p can stay same port because each other has different protocole
const startP2PServer = server => {
    const wsServer = new WebSocket.Server({ server });
    wsServer.on("connection", ws => {
        console.log(`Hello ${ws}`)
    });
    console.log("Manngold P2P Server Running");
};

module.exports = {
    startP2PServer
}
