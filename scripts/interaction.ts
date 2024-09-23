import { ethers } from "hardhat";


async function main() {
    const ERC20MockAddress = "0x1769D9B9725C71EAF34Bc77b928E478C08792Bfc";
    const ERC20Mock = await ethers.getContractAt("IERC20", ERC20MockAddress);

    const MerkleAirdropContractAddress = "0x36C21ad4b2088a8Db6C121A77D7D8d74f3E3FD13";
    const MerkleAirdrop = await ethers.getContractAt("IMerkleAirdrop", MerkleAirdropContractAddress);

    // Approve savings contract to spend token
    const approvalAmount = ethers.parseUnits("1000", 18);

    const approveTx = await ERC20Mock.approve(MerkleAirdrop, approvalAmount);
    approveTx.wait();
    // console.log(approveTx)

    // Specify the address that is eligible to claim (from the proof)
    const claimerAddress = "0x21Be2291f91EA2A1d1EB65DbBea2dA8886Ad7a3E";  // Replace with the actual address

    // Use ethers.getSigner to get the correct signer for the claimer address
    const claimerSigner = await ethers.getSigner(claimerAddress);
    const balanceBefore = await ERC20Mock.balanceOf(claimerAddress);
console.log("Balance before airdrop:", ethers.formatUnits(balanceBefore, 18));


    // const contractBalanceBeforeDeposit = await MerkleAirdrop.getContractBalance();
    // console.log("Contract balance before :::", contractBalanceBeforeDeposit);

    // claim airdrop

    // const depositAmount = ethers.parseUnits("150", 18);
    const claimAmount = ethers.parseEther("100");
    const proof = [
        "0xcf063327ed8abd72e31feaca1e36515ac034bfef82b5c65758b30c9e452b3b2e",
        "0x4d0b524ba70abe8e206fc34f9929bb6bfe978f1d275f766d5eb9510e6b0c0fd7",
        "0xc30c86e259aa2ef18502fae0e09559e01ea3b5d1f56c00eab5a85a4fa9ffa408"
      ]
    //   const bytes32Proof = proof.map(p => ethers.hexlify(p));
    // const depositTx = await saveERC20.deposit(depositAmount);
    // console.log(bytes32Proof)
    const claimAirdrop = await MerkleAirdrop.connect(claimerSigner).claimAirdrop(claimAmount, proof);

    console.log("claimAirdrop",claimAirdrop);

    // // depositTx.wait();

    claimAirdrop.wait();

    // const contractBalanceAfterDeposit = await MerkleAirdrop.getContractBalance();

    // console.log("Contract balance after :::", contractBalanceAfterDeposit);
    const balanceAfter = await ERC20Mock.balanceOf(claimerAddress);
    console.log("Balance after airdrop:", ethers.formatUnits(balanceAfter
        , 18));

    // // Verify if the balance increased by the claim amount
    // // const balanceChange = balanceAfter - balanceBefore;
    // if (balanceChange === claimAmount) {
    //     console.log("Airdrop successfully received:", ethers.formatUnits(claimAmount, 18), "tokens");
    // } else {
    //     console.log("Airdrop claim failed or incorrect amount received.");
    // }
    // console.log('airdrop claimed')



    // Withdrawal Interaction
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
