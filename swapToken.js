//使用web3模块
var Web3 = require('web3')

//创建web3实例，并连接私有链（假设私有链监听8545端口）
//var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s3.binance.org:8545"))

//获取ABI
var fs = require("fs");
var contents = fs.readFileSync("./build/contracts/BSCSwapAgentImpl.json")
var data = JSON.parse(contents)

//创建智能合约，参数为s
var bscSwapAgentContract = new web3.eth.Contract(JSON.parse(JSON.stringify(data.abi)))

console.log(bscSwapAgentContract)
//创建一个变量用于指代主账户，方便后续的操作
var account_0 = web3.eth.accounts[0]


//创建initializer，内同填充合约编译生成的bin，主要用于下一步的合约部署
//var initializer = {from: account_0, data: '0x' + /*bin*/, gas: 300000}

//部署合约
//var book = bookContract.new(initializer)