import { Alchemy, Network } from "alchemy-sdk";
import { ReactNode, createContext, useContext } from "react";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const AlchemyContext = createContext<Alchemy | null>(null);

export function AlchemyProvider({ children }: { children: ReactNode }) {
  const alchemy = new Alchemy(settings);
  return (
    <AlchemyContext.Provider value={alchemy}>
      {children}
    </AlchemyContext.Provider>
  );
}

export const useAlchemy = () => useContext(AlchemyContext);
