//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract ChainList {
    // State variables
    address payable seller;
    string name;
    string description;
    uint256 price;

    // Events
    event SellArticleEvent(
        address indexed _seller,
        string _name,
        uint256 _price
    );

    // sell a new article
    function sellArticle(
        string memory _name,
        string memory _description,
        uint256 _price
    ) public {
        seller = payable(msg.sender);
        name = _name;
        description = _description;
        price = _price;

        // trigger the event to inform that a new article is for sale
        emit SellArticleEvent(msg.sender, _name, _price);
    }

    // get the article
    function getArticle()
        public
        view
        returns (
            address _seller,
            string memory _name,
            string memory _description,
            uint256 _price
        ) 
    {
        return (seller, name, description, price);
    }
}