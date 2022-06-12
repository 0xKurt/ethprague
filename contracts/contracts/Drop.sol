// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IERC20Mint is IERC20 {
  function mint(address, uint256) external;
}

contract Drop is Ownable, ReentrancyGuard {
  IERC20Mint public token;

  constructor(IERC20Mint _token) {
    token = _token;
  }

  function drop() external {
    require(token.balanceOf(msg.sender) < 1 ether);
    token.mint(msg.sender, 1 ether);
    emit Dropped(msg.sender, 1 ether);
  }

  event Dropped(address indexed sender, uint256 amount);
}