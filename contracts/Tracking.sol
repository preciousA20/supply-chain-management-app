// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

// contract Lock {
//     uint public unlockTime;
//     address payable public owner;

//     event Withdrawal(uint amount, uint when);

//     constructor(uint _unlockTime) payable {
//         require(
//             block.timestamp < _unlockTime,
//             "Unlock time should be in the future"
//         );

//         unlockTime = _unlockTime;
//         owner = payable(msg.sender);
//     }

//     function withdraw() public {
//         // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
//         // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

//         require(block.timestamp >= unlockTime, "You can't withdraw yet");
//         require(msg.sender == owner, "You aren't the owner");

//         emit Withdrawal(address(this).balance, block.timestamp);

//         owner.transfer(address(this).balance);
//     }
// }

contract Tracking{
    enum ShipmentStatus {PENDING, IN_TRANSIT, DELIVERED}

    struct Shipment{
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    mapping(address=>Shipment[]) public shipments;
    uint256 public shipmentCount;

    struct TypeShipment{
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    TypeShipment[] public typeshipments;

    event ShipmentCreated(
        address indexed sender,
        address indexed receiver,
        uint256 pickupTime,
        uint256 distance,
        uint256 price
    );
    event ShipmentInTransit(
        address indexed sender,
        address indexed receiver,
        uint256 pickupTime
    );
    event ShipmentDelivered(
        address indexed sender,
        address indexed receiver,
        uint256 deliveryTime
    );

    event ShipmentPaid(
        address indexed sender,
        address indexed receiver,
        uint256 amount
    );

    constructor(){
        shipmentCount = 0;
    }

    function createShipment(
        address _receiver,
        uint256 _pickupTime,
        uint256 _distance,
        uint256 _price 
    ) public payable{
        require(msg.value >= _price, "Insurficient amount");

        Shipment memory shipment = Shipment(
            msg.sender,
            _receiver,
            _pickupTime,
            0,
            _distance,
            _price,
            ShipmentStatus.PENDING,
            false
        );

        shipments[msg.sender].push(shipment);
        shipmentCount++;

        typeshipments.push(TypeShipment(
            msg.sender,
            _receiver,
             _pickupTime,
            0,
            _distance,
           _price,
            ShipmentStatus.PENDING,
            false
        ));

        emit ShipmentCreated(msg.sender, _receiver, _pickupTime, _distance, _price);
    }

    function startShipment(
        address _sender,
        address _receiver,
        uint256 _index
    ) public {
        Shipment storage shipment = shipments[_sender][_index];
        TypeShipment storage typeShipment = typeshipments[_index];

        require(shipment.receiver == _receiver, "incorrect receiver");
        require(
            shipment.status == ShipmentStatus.PENDING,
            "shipment already in transition"
        );

        shipment.status = ShipmentStatus.IN_TRANSIT;
        typeShipment.status = ShipmentStatus.IN_TRANSIT;

        emit ShipmentInTransit(_sender, _receiver, shipment.pickupTime);
    }

    function completeShipment(
        address _sender,
        address _receiver,
        uint256 _index
    ) public {
        Shipment storage shipment = shipments[_sender][_index];
        TypeShipment storage typeShipment = typeshipments[_index];

        require(shipment.receiver == _receiver,
        "Invalid receiver");
        require(!shipment.isPaid, "alread paid");
        require(shipment.status == ShipmentStatus.IN_TRANSIT, "shipment already delivered");

        uint256 amount = shipment.price;

        shipment.status == ShipmentStatus.DELIVERED;
        typeShipment.status == ShipmentStatus.DELIVERED;
        shipment.deliveryTime = block.timestamp;
        typeShipment.deliveryTime = block.timestamp;

        payable(shipment.sender).transfer(amount);

        shipment.isPaid = true;
        typeShipment.isPaid = true;

        emit ShipmentDelivered(_sender, _receiver, block.timestamp);

        emit ShipmentPaid(_sender, _receiver, amount);
    }

    function getShipment(address sender, uint256 _index) public view returns(
        address, address, uint256, uint256, uint256, uint256, ShipmentStatus, bool
    ) {
        Shipment memory shipment = shipments[sender][_index];

        return(
            shipment.sender,
            shipment.receiver,
            shipment.pickupTime,
            shipment.deliveryTime,
            shipment.distance,
            shipment.price,
            shipment.status,
            shipment.isPaid
        );
    }

    function getShipmentCount(address _sender) public view returns(uint){
        return shipments[_sender].length;
    }

    function getAllTransactions() public view returns(TypeShipment[] memory){
        return typeshipments;
    }
}