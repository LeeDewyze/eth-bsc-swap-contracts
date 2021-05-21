
## 1. Prepare enviroment.

* node v14.3.0
* npm 6.14.8
* go go1.13.4 
* truffle  v5.3.0 
  
## 2. Prepare code
* swap contract 
    ```
    git clone  https://github.com/LeeDewyze/eth-bsc-swap-contracts

* Swap Service
  
    ```
    git clone https://github.com/binance-chain/bsc-eth-swap

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


## Reference
>https://www.binance.org/en/blog/open-source-ethereum-and-binance-smart-chain-bi-directional-bridge-solution/