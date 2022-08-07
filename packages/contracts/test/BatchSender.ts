import { ethers } from "hardhat";
import { expect } from "chai";
import testAddresses from "./testAddresses";

describe("BatchSender", () => {
  let batchSender: any;

  const BASE_FEE = ethers.utils.parseEther("10") // 10 ETH
  const RATE = 50;

  const amounts = testAddresses.map(() => ethers.utils.parseEther("0.0000000001"));
  const total = amounts.reduce((acc, amt) => amt.add(acc));

  describe("Deployment", () => {
    it("Should set the correct parameters", async () => {
      const BatchSender = await ethers.getContractFactory("BatchSender");
      batchSender = await BatchSender.deploy(BASE_FEE);

      const fee = await batchSender.fee();
      expect(fee).to.equal(BASE_FEE);
    })
  });

  describe("Multisend Ether", () => {
    // 337 Addresses
    it(`Should correctly calculate fee for ${testAddresses.length}`, async () => {
      // 300 addresses = 60 MATIC FEE
      // 37 addresses = 10 MATIC FEE
      // ---------------------------- +
      // 337 addresses = 70 MATIC FEE
      const fee = await batchSender.calculateFee(testAddresses.length);

      const excess = testAddresses.length % RATE;
      const temp = testAddresses.length - excess;
      const multiplier = temp / RATE
      const expectedFee = BASE_FEE.mul(multiplier).add(BASE_FEE);

      expect(fee).to.equal(expectedFee);
    })

    it("Should not be able to send without paying fee", async () => {
      let error = false;
      try {
        const tx = await batchSender.multisendEther(
          testAddresses,
          amounts,
          { value: total }
        );
        await tx.wait();
      } catch (err) {
        error = true;
      }
      expect(error).to.be.true;
    })

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

      const amountToSend1 = ethers.utils.parseEther("0.001");
      const amountToSend2 = ethers.utils.parseEther("0.001");
      const amountToSend3 = ethers.utils.parseEther("0.001");

      const amounts = [amountToSend1, amountToSend2, amountToSend3]
      const total = amounts.reduce((acc, amt) => amt.add(acc));

      const fee = await batchSender.calculateFee(addresses.length);

      const tx = await batchSender.multisendEther(addresses, amounts, { value: total.add(fee) });
      const receipt = await tx.wait();

      // Balance end
      const addr1BalanceEnd = await ethers.provider.getBalance(signers[1].address);
      const addr2BalanceEnd = await ethers.provider.getBalance(signers[2].address);
      const addr3BalanceEnd = await ethers.provider.getBalance(signers[3].address);

      expect(addr1BalanceEnd).to.equal(addr1BalanceStart.add(amountToSend1));
      expect(addr2BalanceEnd).to.equal(addr2BalanceStart.add(amountToSend2));
      expect(addr3BalanceEnd).to.equal(addr3BalanceStart.add(amountToSend3));
    });

    it("Should get platform fee correctly", async () => {
      const contractBalance = await ethers.provider.getBalance(batchSender.address);
      const feeReceived = await batchSender.calculateFee(3); // 3 addresses

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
