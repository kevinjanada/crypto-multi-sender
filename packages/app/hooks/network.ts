import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { walletAtom } from "../store";

interface NetworkInfo {
  name: string;
  image: string;
}

const networks: Record<number, NetworkInfo> = {
  80001: {
    name: "mumbai",
    image: "/polygon-token.png",
  },
  137: {
    name: "matic",
    image: "/polygon-token.png",
  },
}

export const useNetworkInfo = () => {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [{ chainId }] = useAtom(walletAtom);

  useEffect(() => {
    const networkInfo = networks[chainId];
    if (networkInfo) {
      setNetworkInfo(networkInfo);
    } else {
      setNetworkInfo({
        name: "unknown",
        image: "/unknown.png"
      });
    }
  }, [chainId])

  return networkInfo;
}

export const useNetworkSupported = () => {
  const networkInfo = useNetworkInfo() as NetworkInfo;
  return networkInfo && networkInfo.name != "unknown"
}
