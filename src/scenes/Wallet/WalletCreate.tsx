import React, { useState } from "react";
import { TextUtils } from "../../utils/TextUtils";
import { TransactionUtils } from "../../utils/TransactionUtils";
import { useWeb3Modal } from "@web3modal/react";
import { getAccount } from "@wagmi/core";

function WalletCreate() {
  const [inputs, setInputs] = useState([
    { key: TextUtils.randomString(), value: "" },
  ]);
  // usestate for threshold
  const [threshold, setThreshold] = useState(1);
  const { open } = useWeb3Modal();
  const account = getAccount();

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

    console.log(safe);
  };

  const handleOpenModal = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    await open();
  };

  return (
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
        {account.isConnected ? (
          <button className="btn btn-primary my-2" onClick={createWallet}>
            Create Wallet
          </button>
        ) : (
          <button className="btn btn-primary my-2" onClick={handleOpenModal}>
            Connect Wallet
          </button>
        )}
      </form>
    </div>
  );
}

export default WalletCreate;
