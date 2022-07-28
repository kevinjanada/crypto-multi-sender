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
  Spacer,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Button,
} from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Container minH="80vh" maxW="1120px">
        {/* TODO: Create Form. Refer to  https://chakra-ui.com/getting-started/with-hook-form */}
        <Box maxW="720px" py={24}>
          <Flex direction={{ base: "column", md: "row" }}>
            <FormControl
              flex={{ base: "1", md: "4" }}
              mb="6"
            >
              <FormLabel>Select Token</FormLabel>
              <Select>
                <option value="matic">Matic Native Token</option>
              </Select>
            </FormControl>
            <FormControl
              flex={{ base: "1", md: "1" }}
              ml={{ base: "0px", md: "12px" }}
              mb="6"
            >
              <FormLabel>Decimal Places</FormLabel>
              <NumberInput defaultValue={18} isReadOnly>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Flex>

          <FormControl>
            <FormLabel>Addresses with amounts</FormLabel>
            <Textarea placeholder="Insert addresses with amounts separated with comma" />
          </FormControl>


          <Button
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
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
