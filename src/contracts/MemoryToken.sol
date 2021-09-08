pragma solidity ^0.5.0;

import "./ERC721Full.sol";

contract MemoryToken is ERC721Full {
  // Variables

  // Constructor
  constructor() ERC721Full("Memory Token", "MEMORY") public {
  }

  // Funciones
  function mint(address _to, string memory _tokenURI) public returns(bool) {
    uint _tokenId = totalSupply().add(1);
    
    _mint(_to, _tokenId);
    _setTokenURI(_tokenId, _tokenURI);

    return true;
  }
}
