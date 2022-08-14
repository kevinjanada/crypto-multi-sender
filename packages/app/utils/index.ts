import contractAddresses from 'contracts/config/addresses.json';

const networksByChainId: Record<number, any> = {
  1: {
    name: "Ethereum Mainnet",
    image: "eth-diamond-purple.png",
  },
  137: {
    name: "Polygon Mainnet",
    image: "/polygon-token.png"
  },
  80001: {
    name: "Mumbai Testnet",
    image: "/polygon-token.png"
  }
}

export function getSupportedChainIds () {
  const supportedChainIds: number[] = [];
  for (const [chainId, ] of Object.entries(contractAddresses)) {
    supportedChainIds.push(Number(chainId));
  }
  return supportedChainIds;
}

export function getSupportedNetworks() {
  const supportedChainIds = getSupportedChainIds();
  // const supportedChainIds = [1, 137]
  const supportedNetworks: any[] = [];
  for (const chainId of supportedChainIds) {
    const network = networksByChainId[Number(chainId)]
    if (network) {
      supportedNetworks.push(network);
    }
  }
  return supportedNetworks;
}

export function getEtherscanLink(chainId: number, txHash: string) {
  switch(chainId) {
    case 147:
      return `https://polygonscan.com/tx/${txHash}`;
    case 80001:
      return `https://mumbai.polygonscan.com/tx/${txHash}`;
  }
}

export function formatAddress(address: string, length: number) {
  if (!address) return '';
  let _length = length ? length : 8;
  return address.substring(0, _length / 2) + "..." + address.substring(address.length - _length / 2)
}
