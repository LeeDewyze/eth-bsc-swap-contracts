const BEP20TokenImplementation = artifacts.require("BEP20TokenImplementation");
const BSCSwapAgentImpl = artifacts.require("BSCSwapAgentImpl");
const ETHSwapAgentImpl = artifacts.require("ETHSwapAgentImpl");
const ERC20ABC = artifacts.require("ERC20ABC");

module.exports = function(deployer, network, accounts) {
    console.log("deployer:" + deployer + " \n network: " + network + " \n accounts: "+  accounts)
    //owner = accounts[0];
    //proxyAdmin = accounts[1];
    bep20ProxyAdmin = accounts[1];
    deployer.then(async () => {
        if (network =='rinkeby'){
            await deployer.deploy(ERC20ABC);
            await deployer.deploy(ETHSwapAgentImpl, "10000000");
        } else if (network == 'bscTestnet') {
            await deployer.deploy(BEP20TokenImplementation);
            await deployer.deploy(BSCSwapAgentImpl, BEP20TokenImplementation.address, "10000000000000000", bep20ProxyAdmin);
        } else if (network=='development') {
            await deployer.deploy(ERC20ABC);
            await deployer.deploy(ETHSwapAgentImpl, "10000000");
            await deployer.deploy(BEP20TokenImplementation);
            await deployer.deploy(BSCSwapAgentImpl, BEP20TokenImplementation.address, "10000000000000000", bep20ProxyAdmin);
        }
        // await deployer.deploy(ERC20ABC);
        // await deployer.deploy(ERC20DEF);
        // await deployer.deploy(ERC20EMPTYSYMBOL);
        // await deployer.deploy(ERC20EMPTYNAME);
        // await deployer.deploy(BEP20TokenImplementation);
        // await deployer.deploy(BSCSwapAgentImpl, BEP20TokenImplementation.address, "10000000000000000", bep20ProxyAdmin);
        // await deployer.deploy(ETHSwapAgentImpl, "10000000");
    });
};
