// const { ethers } = require("hardhat")
// const { hre } = require("hardhat")

// async function main() {
 
//   const Tracking = await hre.ethers.getContractFactory("Tracking")
//   const tracking = await Tracking.deploy()

//   await tracking.deployed();

//   console.log(`contract deployed to ${tracking.address}`);
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// import { ethers } from "hardhat";

// async function main(){
//   const Tracking = await ethers.getContractFactory("Tracking")
//   const tracking = await Tracking.deploy()

//   await tracking.deployed()

//   console.log(`Tracking contract deployed to address ${tracking.address}`)

// }
// (async function(){
//   try {
//     await main()
//     process.exit(0);
//   } catch (error) {
//     if(error){
//       console.error(error)
//       process.exitCode = 1;
//     }
//   }
// })()



const hre = require("hardhat")

async function main(){

  const Tracking = await hre.ethers.getContractFactory("Tracking")

  const tracking = await Tracking.deploy()

  await tracking.deployed()

  console.log(`Contract deployed to address: ${tracking.address}`)
}

main().catch((error)=>{
  console.error(error)
  process.exitCode = 1
})