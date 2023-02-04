// this file is auto-generated each time scripts/deploy.js is run
import configChains from '../src/config-chains.json';
import { Chain } from '../src/models/Chain';


export const ALL_CONFIG_CHAINS: {[key: string]: Chain} =  (configChains as any);

delete ALL_CONFIG_CHAINS.localhost;
export let CONFIG_CHAINS: {[key: string]: Chain} = {};

// if the URL starts with art.atila.ca' then only show mainnet chains

export const ENVIRONMENT_NAME = process.env.ENVIRONMENT_NAME || 8008;
Object.values(ALL_CONFIG_CHAINS)
// comment the following line if you want to test with all chains without filtering any chains out
// .filter(chain => ENVIRONMENT_NAME === "prod" ? chain.IS_MAIN_NET : !chain.IS_MAIN_NET)
.forEach(chain => {
    CONFIG_CHAINS[chain.CHAIN_ID] = chain;
});

export const ATILA_API_URL = "https://atila-7.herokuapp.com"

export const MINT_NFT_PRICE_IN_CREDITS = 50; // Credits required tom int an NFT. 50 credits is approximately  $0.50 USD
export const MAX_NFTS_PER_REQUEST = 3;

export const ATILA_USER_PROFILE_API_KEY = process.env.ATILA_USER_PROFILE_API_KEY;