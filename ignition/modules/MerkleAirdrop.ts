import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MerkleAirdrop = buildModule('MerkleAirdropModule', (m) => {
    const tokenAddress = "0x1769D9B9725C71EAF34Bc77b928E478C08792Bfc";
    const merkleRoot = "0x73bcdbadee2cae7a7621c35a0c52b37908d81609c46bac29e5d1e04b43f3844f";
    const airdrop = m.contract('MerkleAirdrop', [tokenAddress, merkleRoot])

    return {airdrop};
})

export default MerkleAirdrop;