import { useState, useEffect } from "react";
import contractAddresses from "contracts/config/addresses.json";
import { ethers } from "ethers";
import { useAtom } from "jotai";
import { walletAtom, web3ProviderAtom } from "../store";
import BatchSender from "contracts/artifacts/contracts/BatchSender.sol/BatchSender.json";

export const useBatchSenderContract = () => {
  const [batchSenderContract, setBatchSenderContract] = useState<ethers.Contract | null>(null);

  const [wallet] = useAtom(walletAtom);
  const [provider] = useAtom(web3ProviderAtom);

  const DEFAULT_CHAIN_ID = "80001"; // MUMBAI

  useEffect(() => {
    if (!wallet.address) {
      return
    }
    let batchSenderContractAddress = (contractAddresses as any)[wallet.chainId.toString()]?.BatchSender;
    if (!batchSenderContractAddress) {
      batchSenderContractAddress = contractAddresses[DEFAULT_CHAIN_ID]?.BatchSender;
    }
    const contract = new ethers.Contract(batchSenderContractAddress, BatchSender.abi, provider?.getSigner());
    setBatchSenderContract(contract);
  }, [wallet]);

  return batchSenderContract;
}
