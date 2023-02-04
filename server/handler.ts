import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { createNFT, CreateNFTRequest } from '../server/CreateNFT';
import bodyParser from 'body-parser';
import { checkNFTRequestBody } from './Middleware';
import { ENVIRONMENT_NAME } from './Config';
import { NFTMetadata } from '../src/models/NFT';

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());


app.post('/api/v1/nft', 
checkNFTRequestBody,
async (req: Request, res: Response) => {

  const { search_credits_available } = (req as any);

  let createNFTResults: any = [];

  const createNFTRequests: Array<CreateNFTRequest> = req.body.nfts;
  try {
    createNFTResults = await Promise.all(createNFTRequests.map(async (createNftRequest) => {
      try {
        const nftResult = await createNFT(createNftRequest);
        return nftResult
      } catch (error) {
        return {error}
      }
  }));
    return res.json({nfts: createNFTResults, search_credits_available});
  } catch (error) {
    return res.status(400).json({error});
  }
});

app.get('/', (req: Request, res: Response) => {

  const repoUrl = "https://github.com/5afe/safe-space";
  const repoUrlHTML = `<a href="${repoUrl}" target="_blank" rel="noreferrer">${repoUrl}</a>`
  return res.send(`Welcome to the Safe Space API. For more instructions on how to use this API see: ${repoUrlHTML}`);
});

/*uncomment if you want to test locally UNCCOMMENT_LINES_BELOW*/
const port = process.env.PORT || 8008;

if (ENVIRONMENT_NAME === "dev") {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}
