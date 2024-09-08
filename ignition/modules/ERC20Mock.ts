import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ERC20MockModule = buildModule("ERC20MockModule", (m) => {
    const erc20 = m.contract("ERC20Mock");

    return {erc20};

}) 

export default ERC20MockModule