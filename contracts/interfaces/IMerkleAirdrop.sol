// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface IMerkleAirdrop {
    function claimAirdrop(uint256 amount, bytes32[] calldata proof) external;
    function getContractBalance() external view returns(uint256);
}