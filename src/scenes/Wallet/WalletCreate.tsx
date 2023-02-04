import React, { useState } from 'react';
import { TextUtils } from '../../utils/TextUtils';

function WalletCreate() {
  const [inputs, setInputs] = useState([{ key: TextUtils.randomString(), value: '' }]);
  // usestate for threshold
  const [threshold, setThreshold] = useState(0);
  
  

  const addInput = () => {
    setInputs([
      ...inputs,
      { key: TextUtils.randomString(), value: '' }
    ]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newInputs = [...inputs];
    newInputs[index].value = e.target.value;
    setInputs(newInputs);
  };

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThreshold(Number.parseInt(e.target.value));
  }

  const removeInput = (inputToRemove: any) => {
    setInputs(inputs.filter((input, i) => input.key !== inputToRemove.key));
  };

  const createWallet = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className='EventDetail container card shadow my-5 p-5'>
        <h1 className='text-center mb-3'>
                Create a Wallet
        </h1>
      <form>
        {inputs.map((input, index) => (
          <div key={input.key} className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder={`Signer ${index + 1} Address`}
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
          Add Another Signer
        </button>
        <div>
          <hr/>

        <label>
        Signers needed to approve a transaction
        </label>
        <input
              type="number"
              className="form-control"
              value={threshold||inputs.length}
              onChange={handleThresholdChange}
            />
        </div>
        <button className="btn btn-primary my-2" onClick={createWallet}>
          Create Wallet
        </button>
      </form>
    </div>
  );
}

export default WalletCreate;
