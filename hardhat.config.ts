import { HardhatUserConfig } from "hardhat/config";
require("@nomiclabs/hardhat-waffle");
//import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    Sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/_kn5c_hKk_w0DGms55waKtuAnrNxoYUe',
      accounts: ['94013e045b6efdc081cadc51b33eab7a2fe0ae79e43a4ebd59d23155a17711f2']
    }
  }
};
//_kn5c_hKk_w0DGms55waKtuAnrNxoYUe
//url https://eth-sepolia.g.alchemy.com/v2/_kn5c_hKk_w0DGms55waKtuAnrNxoYUe

// deploy ->  npx hardhat run scripts/deploy.ts --network Sepolia
export default config;
