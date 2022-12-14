async function main() {
    const NFT = await ethers.getContractFactory("PortionNFT")

    // Start deployment, returning a promise that resolves to a contract object
    const nft = await NFT.deploy(5)
    await nft.deployed()
    console.log("Contract deployed to address:", nft.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
