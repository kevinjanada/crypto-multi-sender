import { Box, Container, Flex, Img, Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { walletAtom } from "../store";
import { useNetworkInfo } from "../hooks/network";

export default function Navbar() {
  const [{ address }, setWallet] = useAtom(walletAtom);
  const [displayAddress, setDisplayAddress] = useState("");
  const networkInfo = useNetworkInfo();

  useEffect(() => {
    const formatAddress = (address: string) => {
      if (!address) return '';
      return address.substring(0, 4) + "..." + address.substring(address.length - 4)
    }
    setDisplayAddress(formatAddress(address));
  }, [address])


  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const { chainId } = await provider.getNetwork();
    setWallet({ address, chainId });
  }

  return (
    <Box bg="brand.blue">
      <Container maxW={"1120px"}>
        <Flex h="16" alignItems="center" justifyContent={"space-between"}>
          <Img
            src="/multi-coin-logo.png"
            alt="multi-coin-logo"
            width="53px"
            height="48px"
          />
          <Flex alignItems="center" width="200px" justifyContent="space-between">
            <Img
              src={networkInfo?.image}
              alt="polygon-token"
              height="36px"
              width="36px"
            />
            <Button
              onClick={connectWallet}
              variant="outline"
              color="brand.lightBlue"
              borderColor="brand.lightBlue"
              _hover={{ color: "brand.blue", background: "brand.lightBlue" }}
            >
              { displayAddress || "Connect Wallet" }
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
