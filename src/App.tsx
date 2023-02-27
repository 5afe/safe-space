import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventsList from "./scenes/Products/EventsList";
import EventDetail from "./scenes/Products/EventDetail";
import Header from "./components/Header/Header";
import WalletCreate from "./scenes/Wallet/WalletCreate";
import { Web3Button, Web3Modal } from "@web3modal/react";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";

export default function WebApp() {
  const chains = [goerli];

  // Wagmi client
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: "206fc16a8983532894a251baeafa4b0d" }),
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({
      projectId: "206fc16a8983532894a251baeafa4b0d",
      version: "1", // or "2"
      appName: "web3Modal",
      chains,
    }),
    provider,
  });

  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);
  return (
    <div>
      <WagmiConfig client={wagmiClient}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<EventsList />} />
            <Route path="/wallet/create" element={<WalletCreate />} />
            <Route path="/p/:eventId" element={<EventDetail />} />
          </Routes>
        </BrowserRouter>
      </WagmiConfig>
      <Web3Modal
        projectId="206fc16a8983532894a251baeafa4b0d"
        ethereumClient={ethereumClient}
      />
    </div>
  );
}
