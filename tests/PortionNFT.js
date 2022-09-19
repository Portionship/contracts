const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT contract", function () {

    it("Deployment should work", async function () {

        const [owner, investor] = await ethers.getSigners();

        const NFT = await ethers.getContractFactory("PortionNFT");
        const nft = await NFT.deploy(10);
        /*
            // Read a contract
            const contract = await NFT.attach(nft.address);
            // console.log(JSON.stringify(nft.interface.functions, null, 4));
            console.log(Object.keys(nft.interface.functions));
            
            // 'name()',
            // 'symbol()',
            // 'maxSupply()',
            // 'owner()',
            // 'renounceOwnership()',
            // 'mint(address,string)',
            // 'transferOwnership(address)'
            // 'balanceOf(address)',
            // 'transferFrom(address,address,uint256)',
            // 'ownerOf(uint256)',
            // 'tokenURI(uint256)',
    
            // 'approve(address,uint256)',
            // 'safeTransferFrom(address,address,uint256)',
            // 'safeTransferFrom(address,address,uint256,bytes)',
            // 'setApprovalForAll(address,bool)',

            // 'getApproved(uint256)',
            // 'isApprovedForAll(address,address)',
            // 'supportsInterface(bytes4)',
        */


        // console.log(await nft.name());
        // console.log(await nft.symbol());
        console.log(await nft.maxSupply());
        // console.log(await nft.owner());
        // console.log(await nft.renounceOwnership());
        // console.log(await nft.balanceOf(investor.address));
        // console.log(await nft.ownerOf(1));
        // console.log(await nft.tokenURI(1));
        // console.log(await nft.owners());
        // console.log(await nft.tokenURIs());

        await nft.mint(owner.address, "ipfs://test");
        await nft.mint(owner.address, "ipfs://test");
        await nft.mint(owner.address, "ipfs://test");
        await nft.mint(owner.address, "ipfs://test");
        await nft.mint(investor.address, "ipfs://test");

        await nft.transferFrom(owner.address, investor.address, 3);
        await nft.transferFrom(owner.address, investor.address, 4);
        console.log(await nft.balanceOf(investor.address));
        console.log(await nft.tokenURIs());

        // expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        expect(true).to.be.true;

    });

});


// CODE REPO
/*
    console.log(await nft.connect(investor).renounceOwnership());
    console.log(await ethers.provider.getBalance(investor.address))

    // const transferFilter = nft.filters.Transfer(investor.address, null, null)
        // const tokens = await nft.queryFilter(transferFilter)
        // const tokenCount = tokens.length;
        // console.log(tokenCount)
*/