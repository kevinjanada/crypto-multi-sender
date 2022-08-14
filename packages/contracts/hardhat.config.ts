import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();
import "./tasks";

const privateKey =
  process.env.PRIVATE_KEY ?
  process.env.PRIVATE_KEY :
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80" as string;

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/" + process.env.MUMBAI_ALCHEMY_KEY,
      chainId: 80001,
      accounts: [privateKey],
    },
    polygon: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/" + process.env.POLYGON_ALCHEMY_KEY,
      chainId: 137,
      accounts: [privateKey],
    },
  }
};

export default config;
