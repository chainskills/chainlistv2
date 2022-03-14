//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract ChainList {
    // State variables
    address payable seller;
    string name;
    string description;
    uint256 price;

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