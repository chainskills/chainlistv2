const { expect, use } = require("chai");
const { ethers } = require("hardhat");

describe("ChainList - Happy Path", function () {
  let chainListInstance;
  let owner;
  let seller;
  const articleName1 = "article 1";
  const articleDescription1 = "Description for article 1";
  const articlePrice1 = 0.5;

  before("setup contract for each test", async () => {
    const ChainList = await ethers.getContractFactory("ChainList");
    chainListInstance = await ChainList.deploy();
    await chainListInstance.waitForDeployment();
    [owner, seller] = await ethers.getSigners();
  });

  it("should be initialized with empty values", async () => {
    const article = await chainListInstance.getArticle();

    expect(article._owner, "owner must be empty").to.equal(ethers.ZeroAddress);
    expect(article._name, "article's name must be empty").to.equal("");
    expect(
      article._description,
      "article's description must be empty",
    ).to.equal("");
    expect(article._price, "article's price must be zero").to.equal(
      BigInt("0"),
    );
  });

  it("should let us sell an article", async () => {
    const transaction = await chainListInstance
      .connect(seller)
      .sellArticle(
        articleName1,
        articleDescription1,
        ethers.parseEther(articlePrice1.toString()),
      );

    // wait for the transaction to complete
    await transaction.wait();

    // check the article
    const article = await chainListInstance.getArticle();
    expect(article._name, "article name must be " + articleName1).to.equal(
      articleName1,
    );
    expect(
      article._description,
      "article description must be " + articleDescription1,
    ).to.equal(articleDescription1);
    expect(
      article._price,
      "article price must be " + articlePrice1 + " ETH",
    ).to.equal(ethers.parseEther(articlePrice1.toString()));
  });
});
