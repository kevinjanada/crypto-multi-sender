import { ethers } from "ethers";
import { atom } from "jotai";

export const walletAtom = atom({
  address: "",
  chainId: 0,
});

export const web3ProviderAtom = atom<ethers.providers.Web3Provider | null>(null);
