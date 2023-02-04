import { create, urlSource } from 'ipfs-http-client';

const ipfsHostUrl = 'https://ipfs.infura.io:5001/api/v0';
const ipfsClient = (create as any)(ipfsHostUrl);

export class NFTUtils {
    static uploadToIPFS = async (fileUrl: string) => {

      const file = await ipfsClient.add(urlSource(fileUrl));
      const ipfsUrl = `https://ipfs.infura.io/ipfs/${file.cid}`;
      return ipfsUrl;
  }

}