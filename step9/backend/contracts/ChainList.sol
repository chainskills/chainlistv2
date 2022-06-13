//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract ChainList {
    // State variables
    address payable owner;
    string name;
    string description;
    uint256 price;

    // Events
    event SellArticleEvent(
        address indexed _seller,
        string _name,
        uint256 _price
    );

    event BuyArticleEvent(
        address indexed _seller,
        address indexed _buyer,
        string _name,
        uint256 _price
    );

    // sell a new article
    function sellArticle(
        string memory _name,
        string memory _description,
        uint256 _price
    ) public {
        owner = payable(msg.sender);
        name = _name;
        description = _description;
        price = _price;

        // trigger the event to inform that a new article is for sale
        emit SellArticleEvent(msg.sender, _name, _price);
    }

    // buy an article
    function buyArticle() public payable {
        // we ensure that there is an article to buy
        require(owner != address(0x0), "No article to buy");

        // we don't allow the seller to buy his own article
        require(msg.sender != owner, "Seller cannot buy his own article");

        // we check that the value sent matches the price of the article
        require(msg.value == price, "Price doesn't match");

        // keep the seller address
        address payable seller = owner;

        // the buyer can pay the seller
        seller.transfer(msg.value);

        // the buyer becomes the new owner
        owner = payable(msg.sender);

        // trigger the event that the article is sold
        emit BuyArticleEvent(seller, msg.sender, name, price);

        // trigger the event to inform that a new article is for sale
        emit SellArticleEvent(owner, name, price);
    }

    // get the article
    function getArticle()
        public
        view
        returns (
            address _owner,
            string memory _name,
            string memory _description,
            uint256 _price
        )
    {
        return (owner, name, description, price);
    }
}
