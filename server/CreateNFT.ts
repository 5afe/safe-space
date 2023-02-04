import { ContractReceipt, ethers, Signer } from 'ethers';

import {
    CONFIG_CHAINS
  } from './Config';

import NFT from '../src/artifacts/contracts/NFT.sol/NFT.json';
import { Chain } from '../src/models/Chain';
import { getAccount, getProvider } from '../src/utils/NetworkHelpers';

import { NFTMetadata } from '../src/models/NFT';
import { NFTUtils } from '../src/utils/NFTUtils';
const { create } = require("ipfs-http-client");

const ipfsHostUrl = 'https://ipfs.infura.io:5001/api/v0';
const client = (create as any)(ipfsHostUrl);

export interface CreateNFTRequest {
    nft: NFTMetadata,
}

export const createNFT = async (request: CreateNFTRequest) =>{


    const { nft } = request;
    const { name, description, owner, chainId, attributes } = nft;
    let { image, address } = nft;

    const activeChain = new Chain({...CONFIG_CHAINS[chainId]});
    
    // TODO getAccount() is also calling getProvider() is this wasted duplicate effort?
    const signer = getAccount(chainId) as Signer;
    const provider = getProvider(chainId);

    const gasPrice = await provider.getGasPrice();
    if (!image.includes("ipfs.")) {
        image = await NFTUtils.uploadToIPFS(image);
    }

    const data = JSON.stringify({
        name, description, image, attributes
    });
    let tokenURI = "";

    try {
        const added = await client.add(data)
        tokenURI = `https://ipfs.infura.io/ipfs/${added.path}`
    }
    catch (ipfsError) {
        console.log(ipfsError);
        throw new Error(`IPFSError: ${ipfsError}`);
    }
    // const url = "https://ipfs.moralis.io:2053/ipfs/QmXYfYAHxTwbY5sQJUNB2ftF5aHvxfkBUwgEKM5dSfVVLg";

    try {


        let nftContract = new ethers.Contract(address, NFT.abi, signer);
        let mintTransactionPromise = await nftContract.createTokenOnBehalfOf(tokenURI, owner, {gasPrice})
        let mintTransaction: ContractReceipt = await mintTransactionPromise.wait();
    
        let event = mintTransaction.events![0]
        let tokenId = event.args![2].toNumber();
    
        nft.tokenId = tokenId;
    
        const blockExplorerUrl = `${activeChain.BLOCK_EXPLORER_URL}/token/${activeChain.NFT_ADDRESS}?a=${tokenId}`;
        console.log("\x1b[32m%s\x1b[0m", `Succesfully Minted NFT! View in block explorer: ${blockExplorerUrl}`);
    
        const transactionMetadata = {
            hash: mintTransaction.transactionHash,
            to: mintTransaction.to,
            from: mintTransaction.from,
            gasUsed: mintTransaction.gasUsed,
            url: `${activeChain.BLOCK_EXPLORER_URL}/tx/${mintTransaction.transactionHash}`
        }

        return { nft, blockExplorerUrl, transaction: transactionMetadata };
    } catch (mintNFTError) {
        console.log("mintNFTError",mintNFTError);
        return { nft, error: mintNFTError };
    }
}


export const createNFTFromJson = async (jsonFile: string) => {

    // load json from file

    const nfts: Array<CreateNFTRequest> = JSON.parse(jsonFile);
    try {
        const createNFTResults = await Promise.all(nfts.map(async (createNftRequest: CreateNFTRequest) => {
          try {
            const nftResult = await createNFT(createNftRequest);
            return nftResult
          } catch (error) {
            return {error}
          }
      }));
        return {nfts: createNFTResults};
      } catch (error) {
        return error;
      }
}


process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});

var args = process.argv.slice(2);

if (args.length > 0) {
    createNFTFromJson(args[0]).then((result) => {
        console.log(result);
    });
}