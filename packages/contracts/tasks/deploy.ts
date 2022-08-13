import { task } from "hardhat/config";
import { ethers } from "ethers";

const BASE_FEE = ethers.utils.parseEther("10");

task('deploy', 'Deploys BatchSender Contract')
  .setAction((async (_args, { ethers, run }) => {
    const network = await ethers.provider.getNetwork();
    const [deployer] = await ethers.getSigners();
    const chainId = network.chainId;

    const Contract = await ethers.getContractFactory("BatchSender", deployer);
    const contract = await Contract.deploy(BASE_FEE)
    await contract.deployed();

    const contracts = { BatchSender: contract.address }

    await run("save-addresses", { contracts, chainId });
  }));
