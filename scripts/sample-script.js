const { legos } = require('@studydefi/money-legos');
const { ethers } = require('hardhat');

//Set Provider 
const network = 'kovan';
const provider = ethers.getDefaultProvider(network);

//Ropsten DAI token
const DAI_ABI = legos.erc20.dai.abi;
const DAI_ADDRESS = '0x4C38cDC08f1260F5c4b21685654393BB1e66a858';
const daiContract = new ethers.Contract(DAI_ADDRESS, DAI_ABI, provider);

//Ropsten Uniswap DAI exchange
const EXCHANGE_ABI = legos.uniswap.exchange.abi;
const EXCHANGE_ADDRESS = '0x8779C708e2C3b1067de9Cd63698E4334866c691C';
const exchangeContract = new ethers.Contract(EXCHANGE_ADDRESS, EXCHANGE_ABI, provider);

// Minimum tokens
const MIN_TOKEN = 1;

//Set deadline 1 minute from now
const moment = require('moment');
const now = moment().unix();
const DEADLINE = now + 60;

//Transaction Setting
const SETTING = {
  gasLimit: 3000000,
  gasPrice: 5000000000,
  from: '0x4317c44fD3143D8AC5723865CF046238A2cd8FD3',
  value: ethers.utils.parseUnits("0.001", 18)
}

async function main() {
  let balance;

  //Check Ether balance BEFORE swap
  balance = await ethers.provider.getBalance(SETTING.from);
  balance = ethers.utils.formatEther(balance);
  console.log(`Ether balance is: ${balance} ETH `);

  //Check DAI balance BEFORE swap
  balance = await daiContract.balanceOf(SETTING.from);
  balance = ethers.utils.formatEther(balance);
  console.log(`Dai balance is: ${balance} DAI`);

  //Perform Swap
  const [signer] = await ethers.getSigners();
  console.log('Performing swap .....');
  const exchangeWithSigner = exchangeContract.connect(signer);

  const tx = await exchangeWithSigner.ethToTokenSwapInput(
    MIN_TOKEN,
    DEADLINE,
    SETTING
  )

  receipt = await tx.wait();
  console.log(`Succesful swap : https://kovan.etherscan.io/tx/${receipt.transactionHash}`);

  //Check Ether Balance After swap 
  balance = await ethers.provider.getBalance(SETTING.from);
  balance = ethers.utils.formatEther(balance);
  console.log(`Ether balance is : ${balance} ETH`);

  //Check DAI balance AFTER swap 
  balance = await daiContract.balanceOf(SETTING.from);
  balance = ethers.utils.formatEther(balance);
  console.log(`Dai balance is: ${balance} DAI`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })