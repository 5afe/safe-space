import React, { useState } from "react";
import { TextUtils } from "../../utils/TextUtils";
import { TransactionUtils } from "../../utils/TransactionUtils";
import { Web3Button, Web3Modal } from "@web3modal/react";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";


function WalletCreate() {
  const [inputs, setInputs] = useState([
    { key: TextUtils.randomString(), value: "" },
  ]);
  // usestate for threshold
  const [threshold, setThreshold] = useState(1);

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

  const addInput = () => {
    setInputs([...inputs, { key: TextUtils.randomString(), value: "" }]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newInputs = [...inputs];
    newInputs[index].value = e.target.value;
    setInputs(newInputs);
  };

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThreshold(Number.parseInt(e.target.value));
  };

  const removeInput = (inputToRemove: any) => {
    setInputs(inputs.filter((input, i) => input.key !== inputToRemove.key));
  };

  const createWallet = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(inputs);

    const safe = await TransactionUtils.createMultisigWallet(
      inputs.map((input) => input.value),
      threshold
    );

    // console.log(safe);
  };

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <div className="EventDetail container card shadow my-5 p-5">
          <h1 className="text-center mb-3">Create a Wallet</h1>
          <form>
            {inputs.map((input, index) => (
              <div key={input.key} className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Owner ${index + 1} Address`}
                  value={input.value}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <button
                  type="button"
                  className="btn btn-outline-danger my-2"
                  onClick={() => removeInput(input)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-outline-primary my-2"
              onClick={addInput}
            >
              Add Another Owner
            </button>
            <div>
              <hr />

              <label>Owners needed to approve a transaction</label>
              <input
                type="number"
                className="form-control"
                value={threshold || inputs.length}
                onChange={handleThresholdChange}
              />
            </div>
            <button className="btn btn-primary my-2" onClick={createWallet}>
              Create Wallet
            </button>
            <Web3Button />
          </form>
        </div>
      </WagmiConfig>
      <Web3Modal
        projectId="206fc16a8983532894a251baeafa4b0d"
        ethereumClient={ethereumClient}
      />
    </>
  );
}

export default WalletCreate;
