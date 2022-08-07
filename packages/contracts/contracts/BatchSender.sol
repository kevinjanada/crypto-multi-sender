// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

// Reference for calculating fees in percentage
// https://www.youtube.com/watch?v=nsf46dzgCog

contract BatchSender is Ownable {
  uint256 public fee;
  uint256 public addressRate = 50;

  constructor(uint256 _fee) {
    fee = _fee;
  }

  function setPlatformFee(uint256 _fee) public onlyOwner {
    fee = _fee;
  }

  function multisendEther(address[] calldata _contributors, uint256[] calldata _balances) external payable {
    // Validate that ether sent has fee
    uint feeToTake = calculateFee(_contributors.length);
    uint256 total = msg.value - feeToTake;
    require(total > 0);

    for (uint256 i = 0; i < _contributors.length; i++) {
      require(total >= _balances[i]);
      assert(total - _balances[i] >= 0);
      total = total - _balances[i];
      (bool success, ) = _contributors[i].call{value: _balances[i]}("");
      require(success, "Transfer failed.");
    }
  }

  function withdraw() public onlyOwner {
    payable(msg.sender).transfer(address(this).balance);
  }

  /**
    [DEPRECATED]
    Basis Points Fee Calculation
    Minimum amount is 10000 wei or 0,00000000000001 Ether
  */
  /*
  function calculateFee(uint amount) public view returns(uint) {
    require((amount / 10000) * 10000 == amount, "amount too small");
    return amount * fee / 10000;
  }
  */

  // Fee is 10 Matic / 50 addresses
  function calculateFee(uint numberOfAddresses) public view returns (uint) {
    if (numberOfAddresses < addressRate) {
      return fee;
    }

    uint256 excess = numberOfAddresses % addressRate;
    uint256 temp = numberOfAddresses - excess;
    
    uint256 feeOutput = temp / addressRate * fee;
    if (excess > 0) {
      feeOutput += fee;
    }

    return feeOutput;
  }

}
