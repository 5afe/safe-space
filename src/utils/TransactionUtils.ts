import { ethers } from "ethers"
import EthersAdapter from '@safe-global/safe-ethers-lib'
import Safe, { SafeFactory, SafeAccountConfig } from '@safe-global/safe-core-sdk'

declare global {
    interface Window {
        ethereum:any
    }
}

export class TransactioUtils {
    
    /**
     * https://stackoverflow.com/a/1054862/5405197
     */
    static createMultisigWallet =  async (owners: Array<string>, threshold: number) => {
        
    }
}
