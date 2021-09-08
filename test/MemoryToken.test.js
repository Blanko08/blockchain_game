const MemoryToken = artifacts.require('./MemoryToken.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Memory Token', (accounts) => {
  let memoryToken

  before(async () => {
    memoryToken = await MemoryToken.deployed()
  })

  describe('Deployment', async () => {
    it('Deploys Successfully', async () => {
      const address = await memoryToken.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it('Has a name', async () => {
      const name = await memoryToken.name();
      assert.equal(name, 'Memory Token');
    });

    it('Has a symbol', async () => {
      const symbol = await memoryToken.symbol();
      assert.equal(symbol, 'MEMORY');
    });
  });

  describe('Token Distribution', async () => {
    let result;

    it('Mints Tokens', async () => {
      await memoryToken.mint(accounts[0], 'https://www.token-uri.com/nft');

      // Debería de incrementar el totalSupply.
      result = await memoryToken.totalSupply();
      assert.equal(result.toString(), '1', 'TotalSupply incorrecto');

      // Debe incrementar el balance del dueño.
      result = await memoryToken.balanceOf(accounts[0]);
      assert.equal(result.toString(), '1', 'Balance del dueño incorrecto');

      // El NFT debe ser sel dueño.
      result = await memoryToken.ownerOf('1');
      assert.equal(result.toString(), accounts[0].toString(), 'Dueño del NFT incorrecto');

      // El dueño puede ver todos los NFTs.
      let balanceOf = await memoryToken.balanceOf(accounts[0]);
      let tokenIds = [];
      for(let i = 0; i < balanceOf; i++) {
        let id = await memoryToken.tokenOfOwnerByIndex(accounts[0], i);
        tokenIds.push(id.toString());
      }
      let expected = ['1'];
      assert.equal(tokenIds.toString(), expected.toString(), 'tokenIds incorrectos');

      // Token URI correcto.
      let tokenURI = await memoryToken.tokenURI('1');
      assert.equal(tokenURI, 'https://www.token-uri.com/nft', 'Token URI incorrecto')
    });
  });
});
