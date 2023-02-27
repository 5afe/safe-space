import { ethers } from "ethers"
import EthersAdapter from '@safe-global/safe-ethers-lib'
import Safe, { SafeFactory, SafeAccountConfig } from '@safe-global/safe-core-sdk'
import { fetchSigner, getProvider } from "@wagmi/core"

export class TransactionUtils {
    
    /**
     * https://stackoverflow.com/a/1054862/5405197
     */
    static createMultisigWallet =  async (owners: Array<string>, threshold: number) => {
        console.log({owners, threshold})

        // Add WalletConnect integration v2
        const provider = getProvider()
        const signer = await fetchSigner()

        console.log({provider, signer})

        console.log('Deploying Safe...')

        if (!signer) throw new Error('No signer found')
        const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer
        })
        const safeFactory = await SafeFactory.create({ ethAdapter })

        console.log({ethAdapter, safeFactory})

        const safeAccountConfig: SafeAccountConfig = {
            owners,
            threshold,
            // ... (Optional params) 
            // https://github.com/safe-global/safe-core-sdk/tree/main/packages/safe-core-sdk#deploysafe
        }

        /* This Safe is connected to owner 1 because the factory was initialized 
        with an adapter that had owner 1 as the signer. */
        const safe: Safe = await safeFactory.deploySafe({ safeAccountConfig })

        const safeAddress = safe.getAddress()

        console.log('Your Safe has been deployed:')
        console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
        console.log(`https://app.safe.global/gor:${safeAddress}`)

        return { safe }
    }
}
