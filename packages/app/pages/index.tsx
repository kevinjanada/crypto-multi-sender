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
} from "@chakra-ui/react";
import { useForm, FieldValues } from "react-hook-form";
import { ethers } from "ethers";
import { useState } from "react";

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

  const onSubmit = (values: FieldValues) => {
    const { token, decimals, addressesAndAmounts } = values as FormValues
    const { addresses, amounts } = parseAddressesAndAmounts(addressesAndAmounts);
    console.log(addresses);
    console.log(amounts);
    // TODO: Call contract function. also add fee to total amount of ether sent 
  }

  const showAddressWithAmountsExample = () => {
    const example = `0x795aE9223FBb6a12a6c71391755Be1707E52EB72,0.005\n0x42D57aAA086Ee6575Ddd3b502af1b07aEa91E495,0.006`;
    setValue("addressesAndAmounts", example);
  }

  const parseAddressesAndAmounts = (addresesAndAmounts: string) => {
    const rows = addresesAndAmounts.split("\n");
    const addresses = [];
    const amounts = [];
    for (let row of rows) {
      const split = row.split(',');
      const address = split[0];
      const amount = ethers.utils.parseEther(split[1]).toString();
      addresses.push(address);
      amounts.push(amount);
    }
    return { addresses, amounts };
  }

  return (
    <>
      <Navbar />
      <Container minH="80vh" maxW="1120px">
        {/* TODO: Create Form. Refer to  https://chakra-ui.com/getting-started/with-hook-form */}
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
                  onClick={showAddressWithAmountsExample}>
                  Show Example
                </Text>
              </Flex>
              <Textarea
                id="addressesAndAmounts"
                placeholder="Insert addresses with amounts separated by comma"
                {...register("addressesAndAmounts", {
                  required: 'This is required',
                })}
              />
            </FormControl>
            <Button
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
              Send Tokens
            </Button>
          </form>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
