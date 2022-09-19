const chai = require('chai')
const { ethers } = require('hardhat')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const expect = chai.expect

describe('Proprty NFT contract', function () {
  let owner, investor, anotherInvestor

  before(async function () {
    [owner, investor, anotherInvestor] = await ethers.getSigners()
  })

  it('should be mintable', async function () {
    const NFT = await ethers.getContractFactory('PortionNFT')
    const nft = await NFT.deploy(5)

    await nft.mint(owner.address, 'ipfs://test1')
    expect(await nft.name()).to.be.equal('Portion')
    expect(await nft.symbol()).to.be.equal('PORTION')
    expect(await nft.balanceOf(owner.address))
      .to.be.eql(ethers.BigNumber.from(1))
  })

  it('should be capped', async function () {
    const NFT = await ethers.getContractFactory('PortionNFT')
    const nft = await NFT.deploy(2)

    await nft.mint(owner.address, 'ipfs://test1')
    await nft.mint(owner.address, 'ipfs://test2')
    expect(await nft.maxSupply()).to.be.eql(ethers.BigNumber.from(2))
    await expect(nft.mint(investor.address, 'ipfs://test3'))
      .to.eventually.rejectedWith(/Max supply exceeded/)
  })

  it('should have a smart contract owner', async function () {
    const NFT = await ethers.getContractFactory('PortionNFT')
    const nft = await NFT.deploy(2)
    expect(await nft.owner()).to.be.equal(owner.address)

    await nft.transferOwnership(investor.address)
    expect(await nft.owner()).to.be.equal(investor.address)

    await expect(nft.transferOwnership(investor.address))
      .to.eventually.rejectedWith(/Ownable: caller is not the owner/)
    await expect(nft.renounceOwnership())
      .to.eventually.rejectedWith(/Ownable: caller is not the owner/)
    await nft.connect(investor).renounceOwnership()
    expect(await nft.owner())
      .to.be.equal('0x0000000000000000000000000000000000000000')
  })

  it('should have an NFT owner (investor)', async function () {
    const NFT = await ethers.getContractFactory('PortionNFT')
    const nft = await NFT.deploy(2)
    await nft.mint(investor.address, 'ipfs://test1')
    await nft.mint(anotherInvestor.address, 'ipfs://test2')

    expect(await nft.owners())
      .to.be.eql([investor.address, anotherInvestor.address])
    expect(await nft.ownerOf(1)).to.be.equal(investor.address)

    await expect(nft.transferFrom(investor.address, anotherInvestor.address, 1))
      .to.eventually.rejectedWith(/caller is not token owner nor approved/)

    await expect(
      nft.connect(investor)
        .transferFrom(investor.address, anotherInvestor.address, 1)
    ).to.be.fulfilled
  })
})
