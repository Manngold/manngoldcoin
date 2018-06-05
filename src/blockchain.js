const CryptoJS = require("crypto-js");

class Block{
    constructor(index, hash, previousHash, timestamp, data){
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data; //When you create block giving information to block
    }
}

const genesisBlock = new Block(
    0,
    '8874D6A284D6DCEEB7B8B2E7269DCA8445DF6D501A93D9A17AC03EF4CD21A42B',
    null,
    1528199534487,
    "This is the genesis"
)

let blockchain = [genesisBlock];

const getLastBlock = () => blockchain[blockchain - 1];

const createHash = (index, previousHash, timestamp, data) =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();


const getTimeStamp = () => new Date().getTime() / 1000;
const creatNewBlock = data => {
    const previousBlock = getLastBlock();
    const newBlockIndex = previousBlock.index + 1;
    const newTimeStamp = getTimeStamp();
    const newHash = createHash(
        newBlockIndex,
        previousBlock.hash,
        newTimeStamp,
        data
    );
    const newBlock = new Block(
     newBlockIndex,
     newHash,
     previousBlock.hash,
     newTimeStamp,
     data   
    );
    return newBlock;
};

const getBlockHash = (block) => createHash(block.index, block.previousHash, block.timestamp, block.data) 

const isNewBlockValid = (candidateBlock, latestBlock) => {
    if(latestBlock.index + 1 !== candidateBlock.index){
        console.log('The candidate block dosent have a vaild index');
        return false;
    }else if(latestBlock.hash !== candidateBlock.previousHash){
        console.log('The previousHash of the candidate block is net the hash of the latest block');
        return false;
    }else if(getBlockHash(candidateBlock) !== candidateBlock.hash){
        console.log('The hash of this block is invalid');
        return false;
    }
    return true;
};

const isNewStructureValid = (block) => {
    return (
        typeof block.index ==='number' &&
        typeof block.hash === "string" &&
        typeof block.previousHash === 'string' &&
        typeof block.timestamp === 'number'&&
        typeof block.data === 'string'
    )
}