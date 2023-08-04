const Web3 = require('web3')
var config = require("../config.json")
const web3 = new Web3(new Web3.providers.HttpProvider(config.provider))

function getTokenHex (tokenName){
    return web3.utils.toHex(config.tokenList[tokenName]);
}
function getTokenName (token){
    return config.tokenName[token];
}


function sleep (ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}
function toHex (data){
    return web3.utils.toHex(data)
}

function getHex (data){
    return web3.utils.hexToBytes(web3.utils.toHex(data))
}
module.exports = {
    getTokenHex,
    sleep,
    getHex,
    toHex,
    getTokenName,
}
