import React from 'react';
import { SafeAuthKit, Web3AuthAdapter } from '@safe-global/auth-kit';
import { Web3AuthOptions } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from '@web3auth/base';

function AccountCreate() {


  // function to create an account
  const createAccount = async () => {

    // https://web3auth.io/docs/sdk/web/modal/initialize#arguments
    const options: Web3AuthOptions = {
    clientId: '<your_client_id>', // https://dashboard.web3auth.io/
    web3AuthNetwork: 'testnet',
    chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: '0x1',
        rpcTarget: `https://rpc.payload.de`
      },
      uiConfig: {
        theme: 'dark',
        loginMethodsOrder: ['google', 'facebook']
      },
    };
    // https://web3auth.io/docs/sdk/web/modal/initialize#configuring-adapters
    const modalConfig = {
        [WALLET_ADAPTERS.TORUS_EVM]: {
          label: 'torus',
          showOnModal: false
        },
        [WALLET_ADAPTERS.METAMASK]: {
          label: 'metamask',
          showOnDesktop: true,
          showOnMobile: false
        }
      }
      // https://web3auth.io/docs/sdk/web/modal/whitelabel#whitelabeling-while-modal-initialization
      const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: 'mandatory'
        },
        adapterSettings: {
          uxMode: 'popup',
          whiteLabel: {
            name: 'Safe'
          }
        }
      });

    // Create an instance of the Web3AuthAdapter
    const web3AuthAdapter = new Web3AuthAdapter(options, [openloginAdapter], modalConfig);

    // Create an instance of the SafeAuthKit using the adapter and the SafeAuthConfig allowed options
    const safeAuthKit = await SafeAuthKit.init(web3AuthAdapter, {
        txServiceUrl: 'https://safe-transaction-goerli.safe.global'
      });
    };

  return (
    <div>
    <div className='EventDetail container card shadow my-5 p-5'>
        <h1 className='text-center mb-3'>
                Create an Account
        </h1>
        <button
          type="button"
          className="btn btn-outline-primary my-2"
          onClick={createAccount}
        >
          Create An Account
        </button>
        
    </div>
    </div>
  );
}

export default AccountCreate;
