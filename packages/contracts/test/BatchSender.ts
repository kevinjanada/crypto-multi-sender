import { ethers } from "hardhat";
import { expect } from "chai";


describe("BatchSender", () => {
  let batchSender: any;

  const amountToSend1 = ethers.utils.parseEther("0.01");
  const amountToSend2 = ethers.utils.parseEther("0.02");
  const amountToSend3 = ethers.utils.parseEther("0.03");

  const amounts = [ amountToSend1, amountToSend2, amountToSend3 ];

  const total = amounts.reduce((acc, amt) => amt.add(acc));

  describe("Deployment", () => {
    it("Should set the correct parameters", async () => {
      const FEE = 500 // 500 basis points = 5 pct
      const BatchSender = await ethers.getContractFactory("BatchSender");
      batchSender = await BatchSender.deploy(FEE);

      const fee = await batchSender.fee();
      expect(fee).to.equal(FEE);
    })
  });

  describe("Multisend Ether", () => {
    it("Should send correct amounts to respective addresses", async () => {
      const signers = await ethers.getSigners();

      // Balance Start
      const addr1BalanceStart = await ethers.provider.getBalance(signers[1].address);
      const addr2BalanceStart = await ethers.provider.getBalance(signers[2].address);
      const addr3BalanceStart = await ethers.provider.getBalance(signers[3].address);

      const addresses = [
        signers[1].address,
        signers[2].address,
        signers[3].address,
      ];

      const tx = await batchSender.multisendEther(addresses, amounts, { value: total });
      const receipt = await tx.wait();

      const fee1 = await batchSender.calculateFee(amountToSend1);
      const fee2 = await batchSender.calculateFee(amountToSend2);
      const fee3 = await batchSender.calculateFee(amountToSend3);

      const amountToReceive1 = amountToSend1.sub(fee1);
      const amountToReceive2 = amountToSend2.sub(fee2);
      const amountToReceive3 = amountToSend3.sub(fee3);
      
      // Balance end
      const addr1BalanceEnd = await ethers.provider.getBalance(signers[1].address);
      const addr2BalanceEnd = await ethers.provider.getBalance(signers[2].address);
      const addr3BalanceEnd = await ethers.provider.getBalance(signers[3].address);

      expect(addr1BalanceEnd).to.equal(addr1BalanceStart.add(amountToReceive1));
      expect(addr2BalanceEnd).to.equal(addr2BalanceStart.add(amountToReceive2));
      expect(addr3BalanceEnd).to.equal(addr3BalanceStart.add(amountToReceive3));
    });

    it("Should get platform fee correctly", async () => {
      const contractBalance = await ethers.provider.getBalance(batchSender.address);
      const feeReceived = await batchSender.calculateFee(total);

      expect(contractBalance).to.equal(feeReceived);
    });
  });

  describe("Administrator functions", () => {
    it("Should be able to witdhraw ether from contract", async () => {
      const signers = await ethers.getSigners();
      const deployer = signers[0];

      const deployerBalance = await ethers.provider.getBalance(deployer.address);
      const feeReceived = await batchSender.calculateFee(total);

      const tx = await batchSender.withdraw();
      const receipt = await tx.wait();

      const deployerBalanceAfterWithdraw = await ethers.provider.getBalance(deployer.address);

      // Expect difference before and after withdraw to be <= fee received && > fee received less gas
      expect(
        deployerBalanceAfterWithdraw.sub(deployerBalance)
          .lte(feeReceived)
      ).to.equal(true);
      expect(
        deployerBalanceAfterWithdraw.sub(deployerBalance)
          .gt(ethers.utils.parseEther('0.0028'))
      ).to.equal(true);
    });

    it("Should be able to set new platform fee", async () => {
      const NEW_FEE = 10000
      const tx = await batchSender.setPlatformFee(NEW_FEE);
      await tx.wait();

      const fee = await batchSender.fee();
      expect(fee).to.equal(NEW_FEE);
    });

  });

});
