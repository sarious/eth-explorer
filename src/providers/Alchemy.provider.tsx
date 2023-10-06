import { ReactNode, createContext, useContext } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);
const AlchemyContext = createContext<Alchemy>(alchemy);

export function AlchemyProvider({ children }: { children: ReactNode }) {
  return (
    <AlchemyContext.Provider value={alchemy}>
      {children}
    </AlchemyContext.Provider>
  );
}

export const useAlchemy = () => useContext(AlchemyContext);
