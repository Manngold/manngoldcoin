const WebSocket = require("ws"),
    BlockChain = require("./blockchain");//socket is connection between server


const { getLastBlock } = BlockChain;
const sockets = [];
//p2p can stay same port because each other has different protocole

//Message Types
const GET_LATEST = "GET_LATEST";
const GET_ALL = "GET_ALL";
const BLOCKCHAIN_RESPONSE = "BLOCKCHAIN_RESPONSE";

//Message Creators

const getLatest = () => {
    return {
        type: GET_LATEST,
        data: null
    };
};

const getAll = () => {
    return {
        type: GET_ALL,
        data: null
    };
};

const blockChainResponse = (data) => {
    return {
        type: BLOCKCHAIN_RESPONSE,
        data
    }
}

const getSockets = () => sockets;

const startP2PServer = server => {
    const wsServer = new WebSocket.Server({ server });
    wsServer.on("connection", ws => {
        initSocketConnection(ws);
    });
    console.log("Manngold P2P Server Running");
};

const initSocketConnection = ws => {
    sockets.push(ws);
    handleSocketMessage(ws);
    handleSocketError(ws);
};

const handleSocketMessage = ws => {
    ws.on("message", data => {

    })
}

const handleSocketError = ws => {
    const closeSocketConnection = ws => {
        ws.close()
        sockets.splice(sockets.indexOf(ws), 1);
    };
    ws.on("close", () => closeSocketConnection(ws));
    ws.on("error", () => closeSocketConnection(ws));
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
};
