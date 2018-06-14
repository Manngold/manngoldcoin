const WebSocket = require("ws");//socket is connection between server

const sockets = [];
//p2p can stay same port because each other has different protocole

const getSockets = () => sockets;

const startP2PServer = server => {
    const wsServer = new WebSocket.Server({ server });
    wsServer.on("connection", ws => {
        console.log(`Hello ${ws}`)
    });
    console.log("Manngold P2P Server Running");
};

const initSocketConnection = socket => {
    sockets.push(socket);
}

const connectToPeers = newPeer => {
    const ws = new WebSocket(newPeer);
    ws.on("open", () => {
        initSocketConnection(ws);
    });
};

module.exports = {
    startP2PServer,
    connectToPeers
}
