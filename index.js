const hash = require('crypto-js/sha256')

class Block {
    constructor(prevHash, data){
        this.prevHash = prevHash;
        this.data = data
        this.timeStamp = new Date()

        this.hash = this.calculateHash()
        this.mineVar = 0;
    }
    calculateHash(){
        return hash(this.prevHash + JSON.stringify(this.data) + this.timeStamp + this.mineVar).toString();
    }

    mine(difficulty){
        while(!this.hash.startsWith('0'.repeat(difficulty))){
            this.mineVar++
            this.hash = this.calculateHash();
        }
    }
}

class BlockChain {
    constructor(difficulty){
        const genesisBlock = new Block('0000', {
            isGenesis: true
        })
        this.chain = [genesisBlock]
        this.difficulty = difficulty
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
        
    }

    addBlock(data){
         
        const lastBlock = this.getLastBlock()
        const newBlock = new Block(lastBlock.hash, data)
        console.time('mine')
        newBlock.mine(this.difficulty)
        console.timeEnd('mine')
        this.chain.push(newBlock)
    }
}

const block = new BlockChain(5)
console.log(block);

block.addBlock({blockchian: 1})
block.addBlock({test:1, a: 1})
block.addBlock({test:1, a: 3, blockchian: 5})
