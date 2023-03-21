import { ethers } from "ethers"
import EthersAdapter from '@safe-global/safe-ethers-lib'
import Safe, { SafeFactory, SafeAccountConfig } from '@safe-global/safe-core-sdk'
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types"
import SafeServiceClient from '@safe-global/safe-service-client'

declare global {
    interface Window {
        ethereum:any
    }
}

export class TransactioUtils {
    
    /**
     * https://stackoverflow.com/a/1054862/5405197
     */

    static getEthAdapter = async () => {

        if (!window.ethereum) {
            throw  new  Error("No crypto wallet found. Please install it.")
        }
    
        // Triggers the wallet to ask the user to sign in
        await  window.ethereum.send("eth_requestAccounts")
        const  provider = new  ethers.providers.Web3Provider(window.ethereum)
        const  signer = provider.getSigner()

        console.log({provider, signer})

        console.log('Deploying Safe...')

        const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer
        })

        return ethAdapter;
    }
    static createMultisigWallet =  async (owners: Array<string>, threshold: number) => {
        console.log({owners, threshold})

        const ethAdapter = await this.getEthAdapter();
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

    static createTransaction = async (safeAddress: string, destination: string, amount: number|string) => {

        amount = ethers.utils.parseUnits(amount.toString(), 'ether').toString()

        const safeTransactionData: SafeTransactionDataPartial = {
        to: destination,
        data: '0x',
        value: amount
        }

        const ethAdapter = await this.getEthAdapter();
        const safeSDK = await Safe.create({
            ethAdapter,
            safeAddress
        })
        // Create a Safe transaction with the provided parameters
        const safeTransaction = await safeSDK.createTransaction({ safeTransactionData })

        // Deterministic hash based on transaction parameters
        const safeTxHash = await safeSDK.getTransactionHash(safeTransaction)

        // Sign transaction to verify that the transaction is coming from owner 1
        const senderSignature = await safeSDK.signTransactionHash(safeTxHash)

        const txServiceUrl = 'https://safe-transaction-goerli.safe.global'
        const safeService = new SafeServiceClient({ txServiceUrl, ethAdapter })
        await safeService.proposeTransaction({
            safeAddress,
            safeTransactionData: safeTransaction.data,
            safeTxHash,
            senderAddress: (await ethAdapter.getSignerAddress())!,
            senderSignature: senderSignature.data,
        })
        console.log(`Transaction sent to the Safe Service: 
        https://safe-transaction-goerli.safe.global/api/v1/multisig-transactions/${safeTxHash}`)
    }
}