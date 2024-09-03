# Merkle Airdrop Project

This project is designed to facilitate the distribution of ERC20 tokens via a Merkle Airdrop mechanism. It uses Hardhat for smart contract development and testing, and a custom script to generate Merkle proofs for airdrop participants.

## Table of Contents

- [Merkle Airdrop Project](#merkle-airdrop-project)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Project Structure](#project-structure)
  - [Installation](#installation)
  - [Usage](#usage)
    - [1. Prepare the Whitelist CSV](#1-prepare-the-whitelist-csv)
    - [2. Generate Merkle Tree and Proofs](#2-generate-merkle-tree-and-proofs)
    - [3. Deploy the Smart Contract](#3-deploy-the-smart-contract)
    - [4. Interact with the Contract](#4-interact-with-the-contract)
  - [Scripts](#scripts)
    - [Generate Merkle Tree and Proofs](#generate-merkle-tree-and-proofs)
  - [Smart Contract Details](#smart-contract-details)
  - [Hardhat Tasks](#hardhat-tasks)
  - [Testing](#testing)
  - [License](#license)

## Overview

This project enables token distributions using a Merkle Airdrop method. Participants are included in a CSV file that lists their addresses and the amount of tokens they are eligible to claim. A Merkle tree is constructed from this data, allowing participants to claim their tokens by providing a Merkle proof that verifies their inclusion in the airdrop.

## Project Structure

```
.
├── contracts/
│   └── MerkleAirdrop.sol          # Smart contract implementing the Merkle Airdrop
├── scripts/
│   └── generateMerkleTree.js      # Script to generate Merkle Tree and proofs
├── utils/
│   ├── wl.csv                     # CSV file with whitelist addresses and amounts
│   ├── proofs.json                # Generated Merkle proofs
│   └── tree.json                  # Generated Merkle Tree data
├── test/
│   └── MerkleAirdrop.test.js      # Test cases for the MerkleAirdrop contract
├── hardhat.config.js              # Hardhat configuration file
└── README.md                      # Project README file
```

## Installation

To get started with the project, you need to have Node.js and npm installed. Then, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/favvie/merkle-airdrop.git
cd merkle-airdrop
```

2. Install the dependencies:

```bash
npm install
```

3. Compile the contracts:

```bash
npx hardhat compile
```

## Usage

### 1. Prepare the Whitelist CSV

- The `wl.csv` file located in the `utils/` directory should contain the list of addresses and the corresponding token amounts in the following format:

```
user_address,amount
0xAddress1,1000
0xAddress2,1500
...
```

### 2. Generate Merkle Tree and Proofs

Run the `generateMerkleTree.js` script to create the Merkle tree and generate proofs for each address:

```bash
npx hardhat run scripts/generateMerkleTree.js
```

This will output the Merkle root and save the proofs in `utils/proofs.json`.

### 3. Deploy the Smart Contract

To deploy the `MerkleAirdrop` contract, use the following Hardhat command:

```bash
npx hardhat run scripts/deploy.js --network <network_name>
```

Replace `<network_name>` with the desired network (e.g., `localhost`, `rinkeby`).

### 4. Interact with the Contract

After deployment, you can interact with the contract to allow participants to claim their airdrop tokens. Make sure to use the correct Merkle proof from `proofs.json`.

## Scripts

### Generate Merkle Tree and Proofs

- **Script:** `scripts/generateMerkleTree.js`
- **Purpose:** Reads the whitelist CSV, constructs a Merkle tree, and generates proofs for each address. The proofs and Merkle root are saved to JSON files.

## Smart Contract Details

- **Contract:** `MerkleAirdrop.sol`
- **Purpose:** Allows users to claim their ERC20 token airdrop using a Merkle proof.
- **Key Functions:**
  - `claimAirdrop(uint256 amount, bytes32[] calldata proof)`: Allows eligible users to claim their tokens by providing a valid proof.
  - `hasClaimed(address user)`: Public mapping to track which addresses have already claimed their tokens.

## Hardhat Tasks

- **Compile Contracts:** `npx hardhat compile`
- **Run Tests:** `npx hardhat test`
- **Deploy Contract:** `npx hardhat run scripts/deploy.js --network <network_name>`

## Testing

Tests are located in the `test/` directory. To run the tests, use:

```bash
npx hardhat test
```

This will run the test cases for the `MerkleAirdrop` contract to ensure its correct functionality.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.