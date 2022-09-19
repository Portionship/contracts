// Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PortionNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 public maxSupply;

    constructor(uint256 _maxSupply) ERC721("Portion", "PORTION") {
        maxSupply = _maxSupply;
    }

    modifier mintCompliance() {
        require(_tokenIds.current() < maxSupply, "Max supply exceeded!");
        _;
    }

    function mint(address recipient, string memory tokenURI)
        public
        onlyOwner
        mintCompliance
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function owners() public view returns (address[] memory) {
        address[] memory _owners = new address[](_tokenIds.current());
        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            _owners[i] = ownerOf(i + 1);
        }
        return _owners;
    }

    function tokenURIs() public view returns (string[] memory) {
        string[] memory _tokenURIs = new string[](_tokenIds.current());
        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            _tokenURIs[i] = tokenURI(i + 1);
        }
        return _tokenURIs;
    }
}
