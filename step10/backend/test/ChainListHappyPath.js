const { expect, use } = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("ChainList - Happy Path", function () {
  let chainListInstance;
  let owner;
  let seller;
  let buyer;
  const articleName1 = "article 1";
  const articleDescription1 = "Description for article 1";
  const articlePrice1 = 0.5;
  let sellerBalanceBeforeSale, sellerBalanceAfterSale;
  let buyerBalanceBeforeSale, buyerBalanceAfterSale;

  before("setup contract for each test", async () => {
    const ChainList = await ethers.getContractFactory("ChainList");
    chainListInstance = await ChainList.deploy();
    await chainListInstance.deployed();
    [owner, seller, buyer] = await ethers.getSigners();
  });

  it("should be initialized with empty values", async () => {
    const article = await chainListInstance.getArticle();

    expect(article._owner, "owner must be empty").to.equal(
      ethers.constants.AddressZero
    );
    expect(article._name, "article's name must be empty").to.equal("");
    expect(
      article._description,
      "article's description must be empty"
    ).to.equal("");
    expect(article._price, "article's price must be zero").to.equal(
      ethers.constants.Zero
    );
  });

  it("should let us sell an article", async () => {
    const transaction = await chainListInstance
      .connect(seller)
      .sellArticle(
        articleName1,
        articleDescription1,
        ethers.utils.parseEther(articlePrice1.toString())
      );

    // wait for the transaction to complete
    const receipt = await transaction.wait();

    // check if the appropriate event has been emitted
    expect(receipt.events.length).to.equal(1);
    expect(
      receipt.events[0].event,
      "event should be SellArticleEvent"
    ).to.equal("SellArticleEvent");
    expect(
      receipt.events[0].args._seller,
      "seller must be " + seller.address
    ).to.equal(seller.address);
    expect(
      receipt.events[0].args._name,
      "article name must be " + articleName1
    ).to.equal(articleName1);
    expect(
      receipt.events[0].args._price.toString(),
      "article price must be " + articlePrice1 + " ETH"
    ).to.equal(ethers.utils.parseEther(articlePrice1.toString()));

    // check the article
    const article = await chainListInstance.getArticle();
    expect(article._name, "article name must be " + articleName1).to.equal(
      articleName1
    );
    expect(
      article._description,
      "article description must be " + articleDescription1
    ).to.equal(articleDescription1);
    expect(
      article._price,
      "article price must be " + articlePrice1 + " ETH"
    ).to.equal(ethers.utils.parseEther(articlePrice1.toString()));
  });

  // buy the article
  it("should let us buy the article", async () => {
    // record balances of seller and buyer before the sale
    sellerBalanceBeforeSale = await seller.getBalance();
    buyerBalanceBeforeSale = await buyer.getBalance();

    // buy the article
    const transaction = await chainListInstance.connect(buyer).buyArticle({
      value: ethers.utils.parseEther(articlePrice1.toString()),
    });

    // wait for the transaction to complete
    const receipt = await transaction.wait();

    // check if the appropriate events have been emitted

    // check the first event
    expect(receipt.logs.length).to.equal(2);
    expect(receipt.events[0].event, "event should be BuyArticleEvent").to.equal(
      "BuyArticleEvent"
    );
    expect(
      receipt.events[0].args._seller,
      "seller must be " + seller.address
    ).to.equal(seller.address);
    expect(
      receipt.events[0].args._buyer,
      "buyer must be " + buyer.address
    ).to.equal(buyer.address);
    expect(
      receipt.events[0].args._name,
      "article name must be " + articleName1
    ).to.equal(articleName1);
    expect(
      receipt.events[0].args._price.toString(),
      "event article price must be " + articlePrice1 + " ETH"
    ).to.equal(ethers.utils.parseEther(articlePrice1.toString()));

    // check the second event
    expect(
      receipt.events[1].event,
      "event should be SellArticleEvent"
    ).to.equal("SellArticleEvent");
    expect(
      receipt.events[1].args._seller,
      "seller must be " + buyer.address
    ).to.equal(buyer.address);
    expect(
      receipt.events[1].args._name,
      "article name must be " + articleName1
    ).to.equal(articleName1);
    expect(
      receipt.events[1].args._price.toString(),
      "article price must be " + articlePrice1 + " ETH"
    ).to.equal(ethers.utils.parseEther(articlePrice1.toString()));

    // record balances of seller and buyer after the sale
    sellerBalanceAfterSale = await seller.getBalance();
    buyerBalanceAfterSale = await buyer.getBalance();

    expect(
      sellerBalanceAfterSale,
      "seller should have earned " + articlePrice1 + " ETH"
    ).to.equal(
      sellerBalanceBeforeSale.add(
        ethers.utils.parseUnits(articlePrice1.toString(), "ether")
      )
    );

    expect(
      buyerBalanceAfterSale,
      "buyer should have spent " + articlePrice1 + " ETH"
    ).to.be.lte(
      buyerBalanceBeforeSale.sub(
        ethers.utils.parseUnits(articlePrice1.toString(), "ether")
      )
    );

    // check that the article is now owned by the buyer
    let article = await chainListInstance.getArticle();
    expect(article._owner, "new seller must be " + buyer.address).to.equal(
      buyer.address
    );
    expect(article._name, "article name must be " + articleName1).to.equal(
      articleName1
    );
    expect(
      article._description,
      "description must be " + articleDescription1
    ).to.equal(articleDescription1);
    expect(
      article._price,
      "article price must be " + articlePrice1 + " ETH"
    ).to.equal(ethers.utils.parseEther(articlePrice1.toString()));
  });
});
