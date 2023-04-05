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

export class TransactionUtils {
    
    /**
     * https://stackoverflow.com/a/1054862/5405197
     */

    static getEthAdapter = async (useSigner: boolean = true) => {
        
    }
    static createMultisigWallet =  async (owners: Array<string>, threshold: number) => {
        
    }

    static createTransaction = async (safeAddress: string, destination: string, amount: number|string) => {

    }

    static confirmTransaction = async (safeAddress: string, safeTxHash: string) => {
        
    }

    static executeTransaction = async (safeAddress: string, safeTxHash: string) => {
        
    }
}