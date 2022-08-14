import { task, types } from "hardhat/config";
import { ethers } from "ethers";

const BASE_FEE = ethers.utils.parseEther("10");

task('deploy', 'Deploys BatchSender Contract')
  .addParam("basefee", "BatchSender base fee to set in ETH unit", BASE_FEE, types.float)
  .setAction((async (_args, { ethers, run }) => {
    const network = await ethers.provider.getNetwork();
    const [deployer] = await ethers.getSigners();
    const chainId = network.chainId;

    let baseFee = _args.basefee ?
      ethers.utils.parseEther(_args.basefee.toString()) :
      BASE_FEE;
    const Contract = await ethers.getContractFactory("BatchSender", deployer);
    const contract = await Contract.deploy(baseFee);
    await contract.deployed();

    const contracts = { BatchSender: contract.address }

    await run("save-addresses", { contracts, chainId });
  }));
