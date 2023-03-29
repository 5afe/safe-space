import React, { useState } from 'react';
import { SafeOnRampKit, SafeOnRampProviderType } from '@safe-global/onramp-kit'

export interface WalletFundProps {
  address: string;
};

function WalletFund() {

  const [address, setAddress] = useState<string>(localStorage.getItem('safeAddress')||'');

  function handleAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAddress(event.target.value);
  }

  const fundWallet = async function() {
        
    const safeOnRamp = await SafeOnRampKit.init(SafeOnRampProviderType.Stripe, {
      onRampProviderConfig: {
        stripePublicKey:
          'pk_test_51MZbmZKSn9ArdBimSyl5i8DqfcnlhyhJHD8bF2wKrGkpvNWyPvBAYtE211oHda0X3Ea1n4e9J9nh2JkpC7Sxm5a200Ug9ijfoO', // Safe public key
        onRampBackendUrl: 'https://aa-stripe.safe.global', // Safe deployed server
      },
    });

    const sessionData = await safeOnRamp.open({
      walletAddress: address,
      networks: ['polygon'],
      element: '#stripe-root',
      sessionId: 'cos_1Mei3cKSn9ArdBimJhkCt1XC', // Optional, if you want to use a specific created session
      events: {
        onLoaded: () => console.log('Loaded'),
        onPaymentSuccessful: () => console.log('Payment successful'),
        onPaymentError: () => console.log('Payment failed'),
        onPaymentProcessing: () => console.log('Payment processing')
      }
    })

    console.log({sessionData})
  }

  return (
    <div>
      <label>Destination Address</label>
            <input
              className="form-control mb-3"
              value={address}
              onChange={handleAddressChange}
            />
      <button className="btn btn-primary my-2" onClick={fundWallet}>
        Buy with Card
      </button>
    </div>
  );
}

export default WalletFund;