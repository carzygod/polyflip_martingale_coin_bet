

const config = require("./config.json")
const contractApi = require("./utils/contractApis")
const api = require("./utils/apis")
const tool = require("./utils/tools")
require('dotenv').config()
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(config.provider))

async function test()
{
    await contractApi.erc20Approve(
        "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        "0x9BaAe2F284B11ACF1f812aB3952a6E84754F8Bd5"
    )
    
}
test()