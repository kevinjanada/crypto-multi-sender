import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { useHydrateAtoms } from "jotai/utils";
import { walletAtom, web3ProviderAtom } from "../store";
import { useEffect } from 'react';
import { ethers } from 'ethers';
import { useAtom } from "jotai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSupportedChainIds } from '../utils';

const theme = extendTheme({ 
  colors: {
    brand: {
      blue: '#1D3D72',
      lightBlue: '#D6DCFB'
    }
  },
})


function MyApp({ Component, pageProps }: AppProps) {
  const { initialState } = pageProps;
  useHydrateAtoms(initialState ? [walletAtom, initialState] : [])

  const supportedChainIds = getSupportedChainIds();

  const [, setWallet] = useAtom(walletAtom);
  const [, setWeb3Provider] = useAtom(web3ProviderAtom)

  useEffect(() => {
    const checkWeb3Provider = async () => {
      const provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider((window as any).ethereum, "any");
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const { chainId } = await provider.getNetwork();
      setWallet({ address, chainId });

      if (!supportedChainIds.includes(Number(chainId))) {
        toast("Unsupported Network");
      }

      (provider.provider as any).on("chainChanged", async function(chain: string) {
        if (!supportedChainIds.includes(Number(chain))) {
          toast("Unsupported Network");
        }
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWallet({
          address,
          chainId: Number(chain),
        })
      });

      (provider.provider as any).on("accountsChanged", async function(accounts: any) {
        const { chainId } = await provider.getNetwork();
        setWallet({
          chainId,
          address: accounts[0],
        })
      });

      setWeb3Provider(provider);
    }

    checkWeb3Provider();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <ToastContainer />
    </ChakraProvider>
  )
}

export default MyApp
