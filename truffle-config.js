/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

require("dotenv").config()
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    // local ganache gui
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    // to deploy contracts on bsc testnet
    bscTestnet: {
      provider: function() {
        return new HDWalletProvider(process.env.BSC_MNEMONIC, process.env.BSC_TEST_RPC_URL);
      },
      network_id: 97,
      confirmations: 1,
      networkCheckTimeout: 600000,
      timeoutBlocks: 50,
      skipDryRun: true,
      from: process.env.BSC_ACCOUNT,
    },
    // to deploy contracts on bsc
    bsc: {
      provider: () => new HDWalletProvider(process.env.BSC_MNEMONIC, process.env.BSC_RPC_URL),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
      from: process.env.BSC_ACCOUNT,
    },
    // to deploy contracts on rinkeby
    rinkeby : {
      provider: function() {
        return new HDWalletProvider(process.env.ETH_MNEMONIC, process.env.RINKEBY_RPC_URL);
      },
      network_id: '4',
      gas: 7500000,
      gasPrice: 2000000000,
      from: process.env.ETH_ACCOUNT,
      timeoutBlocks: 2000,
      confirmations: 1,
      skipDryRun: true,
      networkCheckTimeout: 60000,
    },
    // to deploy contracts on ethereum mainnet
    mainnet : {
      provider: function() {
        return new HDWalletProvider(process.env.MAINNET_MNEMONIC, process.env.MAINNET_RPC_URL);
      },
      network_id: '1',
      gas: 5000000,
      gasPrice: 10000000000,
      from: process.env.MAINNET_ACCOUNT,
      timeoutBlocks: 200,
      confirmations: 2,
      skipDryRun: false
    },
    // Useful for private networks
    // private: {
      // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
      // network_id: 2111,   // This network is yours, in the cloud.
      // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },
  plugins: ["solidity-coverage"],
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.4",    // Fetch exact version from solc-bin (default: truffle's version)
      docker: false,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
}
