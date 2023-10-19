const curveSwapABI = require("./curveSwap.json");
const clipperSwapABI = require("./clipperSwap.json");
const ERC20ABI = require("./ERC20.json");
const synapseSwapABI = require("./synapseSwap.json");
const uniSwapV2ABI = require("./uniSwapV2.json");
const oracleAbi = require('./oracle.json')
const routerAbi = require("./router.json")
const inchAbi = require("./1inch.json")
const mantisAbi = require("./mantis.json")
const polyflipAbi = require("./polyflip.json")
const bookMakerAbi = require("./bookmaker.json")
require('dotenv').config()
const abiConfig ={
    "CurveSwap":{
        "address":"0xF52e46bEE287aAef56Fb2F8af961d9f1406cF476",
        "abi":curveSwapABI
    },
    "ClipperSwap":{
        "address":"0x6bfce69d1df30fd2b2c8e478edec9daa643ae3b8",
        "abi":clipperSwapABI
    },
    "SynapseSwap":{
        "address":"0x85fcd7dd0a1e1a9fcd5fd886ed522de8221c3ee5",
        "abi":synapseSwapABI
    },
    "UniSwapV2":{
        "address":"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        "abi":uniSwapV2ABI
    },
    "oracle":{
        "address":"0xaf04E3eBbc07dD4208682F47e1EE25647e68b233",
        "abi":oracleAbi
    },
    "router":{
        'address':"0x5327616E81361dCd56235186E9AeC4802636eC27",
        "abi":routerAbi
    },
    "inch":{
        "address":"0x84d92679dDdB551DcE0E6C30B7bD0d51AF4B2294",
        "abi":inchAbi
    },
    "mantis":{
        "address":"0x62Ba5e1AB1fa304687f132f67E35bFC5247166aD",
        "abi":mantisAbi
    },
    "polyflip":{
        "address":"0xe5e7e2182961ee87653e22df932ca28e852b1449",
        "abi":polyflipAbi
    },
    "bookMaker":{
        "address":"0x09961f893a1d1419b56950d3795653e28eee436b",
        "abi":bookMakerAbi
    },
    "Erc20":{
        "abi":ERC20ABI
    }
}

function getConfig(functions){
    return abiConfig[functions];
}
module.exports = {
    getConfig
}