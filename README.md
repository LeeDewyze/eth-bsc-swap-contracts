# ETH BSC Swap Contracts

## 1. Security Report

[here](SecurityAssessment.pdf)

## 2. Overview
ETH BSC Swap Contracts are responsible for registering swap pairs and swapping assets between ETH and BSC.

![](./assets/eth-bsc-swap.png)

### 2.1. Register swap pair

1. Users register swap pair for erc20 token on ETH via ETHSwapAgent(`createSwapPair`) if token is not registered.
2. Swap service will monitor the `SwapPairRegister` event and create swap pair on BSC: 
    
    1. create an BEP20 token on BSC
    2. record the relation between erc20 token and bep20 token.

### 2.2. Swap from ETH to BSC

Once swap pair is registered, users can swap tokens from ETH to BSC.

1. Users call `swapBSC2ETH` via ETHSwapAgent and specify erc20 token address, amount and swap fee.
2. Swap service will monitor the `SwapStarted` event and call `fillETH2BSCSwap` via BSCSwapAgent to mint corresponding bep20
tokens to the same address that initiate the swap.

### 2.3. Swap from BSC to ETH

Once swap pair is registered, users can swap tokens from BSC to ETH.

1. Users call `swapBSC2ETH` via BSCSwapAgent and specify bep20 token address, amount and swap fee. Bep20 tokens will be burned.
2. Swap service will monitor the `SwapStarted` event and call `fillBSC2ETHSwap` via BSCSwapAgent to transfer corresponding erc20
   tokens to the same address that initiate the swap.

## 3. Development Environment

- Node v14.16.1
- Truffle v5.2.6 (core: 5.2.6)
- Solidity - ^0.6.4 (solc-js)
- Web3.js v1.2.9
- Ganache CLI v6.12.2 (ganache-core: 2.13.2) on port 8545
- Ganache GUI v2.5.4 (ganache-core: 2.13.2) on port 7545

## 4. File structures

Contracts

BSCSwapAgentImpl.sol - deploy on bsc

BSCSwapAgentUpgradeableProxy.sol

ETHSwapAgentImpl.sol - deploy on ethereum

ETHSwapAgentUpgradeableProxy.sol

...

## 5. Run the project

### 5.1. Clone code and install dependencies

```javascript
git clone this-project-code
```

```javascript
cd /path/to/this/project/folder/
```

Run command to install package dependencies;

```javascript
npm install
```

### 5.2. Run a local blockchain

I run Ganache GUI on port 7545, as it provides a better view;

If you use Ganache GUI too, make sure to go to "Setting", "Accounts & Keys";

If you prefer Ganache-CLI, change the port to 8545 in these files
truffle-config.js and .env file's LOCAL_RPC_URL

next, launch ganache-cli with 50 accounts

ganache-cli -a 50

### 5.3. Compile and Deploy

### 5.3.1. Generate contracts from templates

```javascript
npm run generate
```

or

Generate test contracts from templates, if you want to deploy on development network please exec:
```javascript
npm run generate-test
```

#### 5.3.2. Compile
You can now compile

```javascript
truffle compile
```

### 5.3.3.
restart Ganache GUI or ganache-cli

### 5.3.4. Deploy
open a new terminal

```javascript
truffle migrate --reset --network <network-name>
```

```
Notice:
<network-name> value range: development, bscTestnet, bsc, rinkeby, mainnet
```

## 6. Attention
If you want to run the project, you should copy .env.example file and rename it to .env, then fill values in .env file, 3 parts below:

- DEVELOPMENT_RPC_URL, BSC_TEST_RPC_URL, BSC_RPC_URL, RINKEBY_RPC_URL, MAINNET_RPC_URL --- rpc url, according to the NETWORK you choose
- ETH_ACCOUNT, BSC_ACCOUNT, MAINNET_ACCOUNT --- account to deploy contracts
- ETH_MNEMONIC、BSC_MNEMONIC、MAINNET_MNEMONIC --- mnemonic

## 7. Test the project

```javascript
truffle test --network development
```
