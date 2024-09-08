import {loadFixture} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import {expect} from 'chai';
import { ethers } from "hardhat";
import { keccak256, parseEther, solidityPacked } from "ethers";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

describe("MerkleTreeAirdrop", function() {
  async function deployFixture() {
    const ERCMock20 = await ethers.getContractFactory("ERC20Mock")
    const token = await ERCMock20.deploy()

    const [owner, addr1, addr2] = await ethers.getSigners();

    const wl = [
      [addr1.address, ethers.parseEther("100")],
      [addr2.address, ethers.parseEther("50")],
      
    ]

    const merkletree = StandardMerkleTree.of(wl, ["address", "uint256"])
    const root = merkletree.root;

    const MerkleDrop = await ethers.getContractFactory("MerkleAirdrop")
    const airdropContract = await MerkleDrop.deploy(await token.getAddress(), root)

    await token.transfer(await airdropContract.getAddress(), ethers.parseEther("2000"))

    return {owner, addr1, addr2, root, airdropContract, merkletree}

  }

  describe('merkle tree deployment', function () {
    it("should allow a user to claim their airdrop using a valid proof", async function() {
      const {root, addr1, merkletree, airdropContract } = await loadFixture(deployFixture)

      const proof = merkletree.getProof(0)

      await expect(airdropContract.connect(addr1).claimAirdrop(ethers.parseEther("100"), proof))
      .to.emit(airdropContract, "SuccessfulClaim")
      .withArgs(addr1.address, ethers.parseEther("100"))
    })

    it("should reject invalid claims", async function() {
      const {root, addr1, addr2, merkletree, airdropContract } = await loadFixture(deployFixture)

      const leaf = [addr1.address, ethers.parseEther("100")]

      const proof = merkletree.getProof(leaf)

      // test with wrong address
      await expect(airdropContract.connect(addr2).claimAirdrop(ethers.parseEther("100"), proof))
      .to.be.revertedWith("Invalid proof.")

    })

    it('airdrop has already being claimed', async function () {
      const {root, addr1, merkletree, airdropContract } = await loadFixture(deployFixture)

      const leaf = [addr1.address, ethers.parseEther("100")]

      const proof = merkletree.getProof(leaf)

      await airdropContract.connect(addr1).claimAirdrop(ethers.parseEther("100"), proof)

      await expect(airdropContract.connect(addr1).claimAirdrop(ethers.parseEther("100"), proof))
      .to.be.revertedWith("Airdrop already claimed.")
    })

  }) 

})