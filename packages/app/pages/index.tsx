import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Box,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Button,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useForm, FieldValues } from "react-hook-form";
import { ethers } from "ethers";
import { useBatchSenderContract } from "../hooks/contracts";
import { useState } from "react";
import { toast } from 'react-toastify';
import { walletAtom } from "../store";
import { useAtom } from "jotai";
import { getEtherscanLink, formatAddress, getSupportedNetworks } from "../utils";
import { useNetworkSupported } from "../hooks/network";

interface FormValues {
  token: string;
  decimals: string;
  addressesAndAmounts: string;
}

const Home: NextPage = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const supportedNetworks = getSupportedNetworks();

  const isNetworkSupported = useNetworkSupported();

  const batchSenderContract = useBatchSenderContract() as ethers.Contract;

  const [wallet,] = useAtom(walletAtom);

  const [addresses, setAddresses] = useState<string[]>([]);
  const [amounts, setAmounts] = useState<ethers.BigNumber[]>([]);
  const [fee, setFee] = useState("");

  const [isSubmmittingTx, setIsSubmittingTx] = useState(false);

  const onSubmit = async (_values: FieldValues) => {
    // const { token, decimals, addressesAndAmounts } = values as FormValues
    
    // Calculate total ether to send to contract, including fee
    let total = amounts.reduce((acc, amt) => amt.add(acc), ethers.BigNumber.from(0));
    total = total.add(fee);

    try {
      setIsSubmittingTx(true);
      const tx = await batchSenderContract.multisendEther(addresses, amounts, { value: total });
      const receipt = await tx.wait();

      const txLink = getEtherscanLink(wallet.chainId, receipt.transactionHash);
      // Show toast notification
      toast(() => (
        <div style={{ fontSize: 12 }}>
          <div>Transaction Success!</div>
          <div>Click on the link below to view your transaction</div>
          <div>
            <a href={txLink} target="_blank" rel="noreferrer">
              <u>{formatAddress(receipt.transactionHash, 24)}</u>
            </a>
          </div>
        </div>
      ))
    } catch (err) {
      toast(`Sorry but there is an error sending your transaction ${err}`);
    }

    setIsSubmittingTx(false);
  }

  const setAddressWithAmountsExample = () => {
    const example = `0x795aE9223FBb6a12a6c71391755Be1707E52EB72,0.005\n0x42D57aAA086Ee6575Ddd3b502af1b07aEa91E495,0.006`;
    setValue("addressesAndAmounts", example);
    const { addresses, amounts } = parseAddressesAndAmounts(example);
    setAddresses(addresses);
    setAmounts(amounts);
    calculateFee(addresses.length);
  }

  const onAddressesAndAmountsChanged = (e: any) => {
    const value = e.target.value;
    const { addresses, amounts } = parseAddressesAndAmounts(value);
    setAddresses(addresses);
    setAmounts(amounts);
    calculateFee(addresses.length);
  }

  const parseAddressesAndAmounts = (addresesAndAmounts: string) => {
    if (!addresesAndAmounts) {
      return { addresses: [], amounts: [] }
    }
    try {
      const rows = addresesAndAmounts.split("\n");
      const addresses = [];
      const amounts = [];
      for (let row of rows) {
        const split = row.split(',');
        const address = split[0];
        const isAddress = ethers.utils.isAddress(address);
        if (!isAddress) {
          toast(`Invalid address: ${address}`);
          throw new Error("invalid address");
        }
        const amount = ethers.utils.parseEther(split[1]);
        addresses.push(address);
        amounts.push(amount);
      }

      return { addresses, amounts };
    } catch (err) {
      return { addresses: [], amounts: [] }
    }
  }

  const calculateFee = async (numOfAddresses: number) => {
    if (numOfAddresses == 0) {
      setFee("");
      return;
    }
    const fee = await batchSenderContract.calculateFee(numOfAddresses);
    setFee(fee.toString());
  }

  return (
    <>
      <Navbar />
      <Container minH="90vh" maxW="1120px">

        <Box mt="4">
          <Text fontSize="xl">Supported Networks</Text>
          <Flex mt="4">
          {supportedNetworks.map(n => (
            <Flex key={n.name} flexDirection={"column"} alignItems="center" mr="4">
              <img
                src={n.image}
                alt={n.name}
                style={{ height: "32px" }}
              />
              <Text fontSize="12px" >{n.name}</Text>
            </Flex>
          ))}
          </Flex>
        </Box>

        {/* https://chakra-ui.com/getting-started/with-hook-form */}
        <Box maxW="720px" py={24}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction={{ base: "column", md: "row" }}>
              {/* Select Token */}
              <FormControl
                flex={{ base: "1", md: "4" }}
                mb="6"
              >
                <FormLabel>Select Token</FormLabel>
                <Select
                  id="token"
                  {...register("token", {})}
                >
                  <option value="matic">Matic Native Token</option>
                </Select>
              </FormControl>
              {/* Decimal Places */}
              <FormControl
                flex={{ base: "1", md: "1" }}
                ml={{ base: "0px", md: "12px" }}
                mb="6"
              >
                <FormLabel>Decimal Places</FormLabel>
                <NumberInput
                  id="decimals"
                  defaultValue={18}
                  isReadOnly
                >
                  <NumberInputField {...register("decimals", {})} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Flex>
            {/* Addresses with amounts */}
            <FormControl>
              <Flex justify="space-between">
                <FormLabel>Addresses with amounts</FormLabel>
                <Text
                  as="u"
                  _hover={{ cursor: "pointer" }}
                  onClick={setAddressWithAmountsExample}>
                  Show Example
                </Text>
              </Flex>
              <Textarea
                id="addressesAndAmounts"
                placeholder="Insert addresses with amounts separated by comma"
                {...register("addressesAndAmounts", {
                  required: 'This is required',
                  onBlur: onAddressesAndAmountsChanged,
                })}
              />
            </FormControl>
            <Flex pt="2">
              {fee && (
                <Text>
                  Fee for <b>{addresses.length}</b> addresses: &nbsp;
                  <b>{ethers.utils.formatEther(fee)} MATIC</b>
                </Text>
              )}
            </Flex>
            { !isNetworkSupported && <Text color="red.500">Unsupported Network</Text> }
            <Button
              disabled={!fee || isSubmmittingTx || !isNetworkSupported}
              type="submit"
              mt="12"
              w="100%"
              variant="outline"
              color="brand.lightBlue"
              background="brand.blue"
              _hover={{
                color: "brand.blue",
                background: "brand.lightBlue",
                borderColor: "brand.lightBlue",
              }}
              _disabled={{
                color: "brand.lightBlue",
                background: "grey"
              }}
            >
              {
                isSubmmittingTx ? 
                <Spinner color='red.500' /> :
                "Send Tokens"
              }
            </Button>
          </form>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
