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

console.log(blockchain);