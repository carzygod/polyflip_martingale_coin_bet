const Web3 = require('web3')
const contractConfig = require("../abi/abis")
const config = require("../config.json")
require('dotenv').config()
const web3 = new Web3(new Web3.providers.HttpProvider(config.provider))

async function getMyBalance()
{
    return await web3.eth.getBalance(process.env.PUBLIC_ADDRESS)
}
async function getTokenbalance(token)
{
    const contractInfo = contractConfig.getConfig("Erc20");
    var  Ctr = new web3.eth.Contract(contractInfo.abi,token);
    var ret ; 
    await Ctr.methods.balanceOf(process.env.PUBLIC_ADDRESS).call()
                .then(function(result){ 
                   ret = result;
            });
    return ret;
}
/**
 * 🚀 Send Out Transactions
 */

async function placeBet(amount){
    const contractInfo = contractConfig.getConfig("polyflip");
    const  Ctr = new web3.eth.Contract(contractInfo.abi,contractInfo.address);
    const tx = Ctr.methods.placeBet(
        0,
        1,
        process.env.PUBLIC_ADDRESS,
        "0x0000000000000000000000000000000000000000",
        web3.utils.toWei(amount.toFixed(0), "ether")
    );
    const signedTx = await signTxnWithValue(contractInfo.address,tx,web3.utils.toWei(amount.toFixed(0), "ether"));
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return receipt;
}

async function bookMakerBet(amount){
    const contractInfo = contractConfig.getConfig("bookMaker");
    const  Ctr = new web3.eth.Contract(contractInfo.abi,contractInfo.address);
    const tx = Ctr.methods.play(
        "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        "0x82875517c2B4bd534de4B2C0d21BFf5F40b25dA6",
        1,
        amount,
        "0x000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001"
        // Buffer.from("0x000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001","hex")
    );
    const signedTx = await signTxnWithValue(contractInfo.address,tx,web3.utils.toWei("0.0002", "ether"));
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return receipt;
}


async function erc20Approve(tokenA,target){
    const contractInfo = contractConfig.getConfig("Erc20");
    const  Ctr = new web3.eth.Contract(contractInfo.abi,tokenA);
    const tx = Ctr.methods.approve(target,"100000000");
    const signedTx = await signTxn(tokenA,tx);

    if(signedTx ==0 ){
        //Gas Limit 
        return 0;
    }
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return receipt;
}


async function  doSignTransaction(txn){
    return await web3.eth.accounts.signTransaction(txn,process.env.PRIVATE_KEY);
}

/**
 */

async function signTxn(to,tx){
    console.log("🐞 try sign :: ")
    const gas = await tx.estimateGas({from: process.env.PUBLIC_ADDRESS});
    const gasPrice = (await web3.eth.getGasPrice());
    const gasComsume = gas*gasPrice/1e18;
    console.log(gasComsume);
    if(gasComsume>config.tradeSetting.gasLimit){
        console.log("##Reach Gas Limit . Pause Transaction##")
        return 0 ;
    }
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(process.env.PUBLIC_ADDRESS);
    console.log(nonce)
    return await web3.eth.accounts.signTransaction(
        {
          to: to, 
          data,
          gas,
          gasPrice,
          nonce, 
          chainId: config.chainId
        },
        process.env.PRIVATE_KEY
      );
}

async function signTxnWithValue(to,tx,value){
    console.log("🐞 try signTxnWithValue :: ")
    const gas = await tx.estimateGas({from: process.env.PUBLIC_ADDRESS,value:value});
    const gasPrice = await web3.eth.getGasPrice();
    const gasComsume = gas*gasPrice/1e18;
    console.log(gasComsume);
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(process.env.PUBLIC_ADDRESS);
    return await web3.eth.accounts.signTransaction(
        {
          to: to, 
          data,
          gas,
          gasPrice,
          nonce, 
          chainId: config.chainId,
          value: value,
        },
        process.env.PRIVATE_KEY
      );
}

async function verfiTxnStatus(tx){
    const pendingTransactions = await web3.eth.getTransaction(tx)
    return pendingTransactions;
}

module.exports = {
    //View Only
    //Transactions
    erc20Approve,
    doSignTransaction,
    verfiTxnStatus,
    placeBet,
    getMyBalance,
    bookMakerBet,
    getTokenbalance
}