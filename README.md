# How to swap in Uniswap with Ether.js and Hardhat.

In this repo, you can interact with the uniswap protocol v1.
I'm show an examples  simple swap between ETH and DAI. Can you find the address exchange for any other token you want to swap [Uniswap v1 factory ](https://kovan.etherscan.io/address/0xD3E51Ef092B2845f10401a0159B2B96e8B6c3D30#readContract)
 using the getExchange() function, enter the contract address of token.

Will you work with [Hardhat](https://hardhat.org/) like development environment and the library  [Ethers.js](https://docs.ethers.io/) that allow you to interact with remote ethereum node in this case the Kovan Testnet.

 > [Get Faucet](https://faucets.chain.link/) Ether for Kovan Testnet

#### Prerequsites
Please install or have installed the following:
* nodejs (v16.13.2) and npm (8.1.2).

#### Installation

1. Clone this repo
`git clone https://github.com/pinajmr/swap-uniswapV1-Hardhat-Ethers.js.git Swap-with-UniswapV1`
2. Then, 
`cd Swap-with-UniswapV1`.
3. Install dependencies using 
`npm install`.
4. update .env_example file for .env and change the information.
5. Update Public_Key in script file.

#### Usage
##### Running Scripts
`npx hardhat run scripts/swap-eth-dai.js --network kovan`

Remember: _Only your work on Kovan testnet_.