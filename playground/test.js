
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { Network, Alchemy } = require("alchemy-sdk");
const { API_KEY } = process.env;

const settings = {
    apiKey: API_KEY,
    network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(settings);

// Print owner's wallet address:
const ownerAddr = "0x";
console.log("fetching NFTs for address:", ownerAddr);
console.log("...");

// Print total NFT count returned in the response:
const nftsForOwner = await alchemy.nft.getNftsForOwner(ownerAddr);
console.log("number of NFTs found:", nftsForOwner.totalCount);
console.log("...");

// Print contract address and tokenId for each NFT:
// for (const nft of nftsForOwner.ownedNfts) {
//     console.log("===");
//     console.log("contract address:", nft.contract.address);
//     console.log("token ID:", nft.tokenId);
// }
// console.log("===");

// Fetch metadata for a particular NFT:
console.log("fetching metadata for a Portionship NFT...");
const response = await alchemy.nft.getNftMetadata(
    "0x",
    "5"
);

const meta = await fetch(response.tokenUri.gateway);

const data = await meta.json()

// Uncomment this line to see the full api response:
// console.log(response);

// Print some commonly used fields:
console.log("NFT name: ", response.title);
console.log("token type: ", response.tokenType);
console.log("tokenUri: ", response.tokenUri.gateway);
console.log("image url: ", response.rawMetadata.image);
console.log("time last updated: ", response.timeLastUpdated);
console.log("attributes: ", data.attributes);



