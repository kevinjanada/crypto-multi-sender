import { task } from "hardhat/config";
import fs from "fs";
import path from "path";

task("save-addresses", "Save deployed contract addresses")
  .setAction(async ({ contracts, chainId }) => {
    const addressesFilePath = path.join(__dirname, "../config/addresses.json");
    const buffer = fs.readFileSync(addressesFilePath);
    const addresses: Record<string, Record<string, string>> = JSON.parse(buffer.toString());

    for (const [name, address] of Object.entries(contracts)) {
      if (!addresses[chainId]) {
        addresses[chainId] = { [name]: '' };
      }
      addresses[chainId][name] = address as string;
    }

    fs.writeFileSync(
      addressesFilePath,
      JSON.stringify(addresses, undefined, 2)
    );
  }
);
