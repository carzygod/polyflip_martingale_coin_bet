
const config = require("./config.json")
const contractApi = require("./utils/contractApis")
const api = require("./utils/apis")
const tool = require("./utils/tools")
require('dotenv').config()
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(config.provider))

var myBalance = 0;

var index = 0 ; 

var baseAmout = 100000 ;
function getTokenHex (data){
    return web3.utils.toHex(data);
}
async function newBet(amount)
{
    var txn = await contractApi.placeBet(amount)
    return txn
}
async function newBookMakerBet(amount)
{
    try{
        var txn = await contractApi.bookMakerBet(amount)
        return txn
    }catch(e)
    {
        return false
    }

}

// var amount =  10;
async function signLoop(){

    var nowBalance = await contractApi.getTokenbalance("0xc2132D05D31c914a87C6611C10748AEb04B58e8F");
    console.log(Number(nowBalance)<=Number(myBalance))
    if(Number(nowBalance)<=Number(myBalance))
    {
        var amount = Math.pow(2, index)*baseAmout;
        if(amount<(nowBalance))
        {
            var tx = await newBookMakerBet(
            amount
                );
                if(tx)
                {
                    console.log(
                        `${index} 🔥You have place new bet for : `,amount,tx.transactionHash
                        )
                }else{
                    throw("err");
                }

        }else{
            var tx = await newBookMakerBet(
                (nowBalance)
                    );

                    if(tx)
                    {
                        console.log(
                            "⚠️ This is a warning for new bet : ",Number(nowBalance),tx.transactionHash
                            )
                    }else{
                        throw("err");
                    }
        }
        myBalance=nowBalance;
        index++;
    }else{
        console.log("🍺You have win the bet , Now your balance : ",nowBalance);
        myBalance=nowBalance;
        index=0;
    }

    return true;
}


async function init(){
    myBalance = await contractApi.getTokenbalance("0xc2132D05D31c914a87C6611C10748AEb04B58e8F");
    var i = 1 ;
    while(true){
        try{
            await signLoop();
            await tool.sleep(60000);
        }
        catch(e){
            console.log(e)
            await tool.sleep(60000);
        }
        
        i++;
    }

}

async function debug()
{
    var before = await contractApi.getTokenbalance("0xc2132D05D31c914a87C6611C10748AEb04B58e8F")
    console.log(
        "🔥Currently Balance"
        ,
        before
        )
    // var hash = await newBet(0.2)
    var hash = await newBookMakerBet(100000)
    console.log(hash.transactionHash)
    await tool.sleep(60000)
    var after = await contractApi.getTokenbalance("0xc2132D05D31c914a87C6611C10748AEb04B58e8F");
    console.log(
        "🍺Now Balance"
        ,
        after
        )
    console.log(Number(after)<=Number(before))
}
// signLoop()

// debug()

init()