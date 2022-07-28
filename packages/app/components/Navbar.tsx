import { Box, Container, Flex, Img, Button } from "@chakra-ui/react";

export default function Navbar() {
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
              src="/polygon-token.png"
              alt="polygon-token"
              height="36px"
              width="36px"
            />
            <Button
              variant="outline"
              color="brand.lightBlue"
              borderColor="brand.lightBlue"
              _hover={{ color: "brand.blue", background: "brand.lightBlue" }}
            >
              Connect Wallet
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
