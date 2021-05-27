
## 1. Prepare enviroment.

* node v14.3.0
* npm 6.14.8
* go go1.13.4 
* truffle  v5.3.0 
* remixd 
*  npm install -g remixd
## 2. Prepare code
* swap contract 
    ```
    git clone  https://github.com/LeeDewyze/eth-bsc-swap-contracts

* Swap Service
  
    ```
    git clone https://github.com/binance-chain/bsc-eth-swap

* Verify project
    ```
    git clone https://github.com/LeeDewyze/check-contract

## 3. Config MetaMask

* Config BSC net
  * open MetaMask, open settings -> network
    * Test net
    ```
    Network Name：BSCTEST
    PRC：https://data-seed-prebsc-1-s2.binance.org:8545/
    ChainID：97
    Currency Symbol：BNB

  * Main Net
    ```
    Network Name：BSCMainNet
    PRC：https://bsc-dataseed1.binance.org/
    ChainID：56
    Currency Symbol：BNB
    Block Explore URL:  https://bscscan.com/

  >Reference https://www.yuque.com/zgryhn/kgrqd1/dk34bu

## 4. Get Test BNB and Ether
    
    * Get ether from https://faucet.rinkeby.io/
    * Get BNB from https://testnet.binance.org/faucet-smart

## 5. Deploy eth-bsc-swap-contracts 


    cd eth-bsc-swap-contracts
    cp .env.example .env

* config env

    please refer to .evn file

* deploy to BSC, Record BSCSwapAgentImpl.sol contract address and block height for swap service
  
    ```
    truffle migrate --reset --network bscTestnet

    
* deploy to Rinkeby, Record ETHSwapAgentImpl contract address and block height for swap service
    ```
    truffle migrate --reset --network rinkeby

## 6. Deploy Swap Service

* Config env 
  
  Find config file: bsc-eth-swap/config/config.json

  Set your metamask private key:

  key_manager_config.local_bsc_private_key
  key_manager_config.local_eth_private_key

  chain_config.bsc_swap_agent_addr
  chain_config.bsc_start_height

  chain_config.eth_swap_agent_addr
  chain_config.eth_start_height

* Run swap service
    
    ```
    make build

    ./build/swap-backend --config-type local --config-path config/config.json


---

## Check Swap Service

```
 cd check-contract
 config env in .evn

 npm install 
 # register erc20 token to eth, and go service will register BEP20 token to BSC
 # after get BEP20 token address, pls set to .env
 npm run register
 # swap ETH to BSC 
 npm run swapETH2BSC
 # swap BSC to ETH
 npm run swapBSC2ETH

## OPEN Remix https://remix.ethereum.org/
    ```
    remixd -s /Users/xxxxxx/coin/eth-bsc-swap-contracts(absolute path) --remix-ide https://remix.ethereum.org


* Login metamask
* chose remix menu "Deploy & Run transaction", 
    *   EnVironment:  inject Web3
    *   Connect metamask to remix

    *   deploy contracts To ETH, make sure MetaMask's network is rinkeby 

        /eth-bsc-swap-contracts/blob/deploy/contracts/test/ERC20ABC.sol
        Record address:0x34094AfF083D4B639109adc185b58760429D87Bf

        /eth-bsc-swap-contracts/blob/deploy/contracts/ETHSwapAgentImpl.sol
        
        params: swapFee=10000000 Record address:0xAac521164E8A97C54Bf43449333DC60B6352cDdd
        
        open:https://rinkeby.etherscan.io/, Get block height: 8658836

    *   deploy contracts To BSC, make sure MetaMask's network is BSC test network 

       * deploy /eth-bsc-swap-contracts/blob/deploy/contracts/bep20/BEP20TokenImplementation.sol
         Record address:0x25f65b914c3786BCa07415cC019A8Cf0d8aa25D7

       * /eth-bsc-swap-contracts/blob/deploy/contracts/BSCSwapAgentImpl.sol
         params: address= BEP20TokenImplementation.address , swapFee=10000000000000000, bep20ProxyAdminAddr = account[1]=0x9e0674C4b88B38D72bB1E79bCB36F467eAFEf572

         Record address: 0x7D2002766201BEbdf38a450768E0Dfe8c88Ce082
         open：https://testnet.bscscan.com/， Get block height： 9208377
    
    *  ethSwap.registeredERC20(ERC20ABC.address);     
        
    *  erc20ABC.approve(ETHSwapAgentImpl.address, "1000000000000")

    *  ethSwap.swapETH2BSC(ERC20ABC.address, "100000")
    
    *  methods.approve(BSCSwapAgentImpl.address, "1000000000000").send({from: accounts[0]});

## Reference
>https://www.binance.org/en/blog/open-source-ethereum-and-binance-smart-chain-bi-directional-bridge-solution/