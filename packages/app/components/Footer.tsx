import { Box, Container, Flex, Img, Button } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box bg="brand.blue">
      <Container maxW="1120px">
        <Flex alignItems="center" h="64px">
          <Box>
            <a href="https://iconscout.com/icons/polygon-token" target="_blank" rel="noreferrer">
              Polygon Token Logo Icon
            </a>{" "}
            by{" "}
            <a href="https://iconscout.com/contributors/polygon" target="_blank" rel="noreferrer">
              Polygon
            </a>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}