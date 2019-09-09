pragma solidity ^0.5.0;

contract CoreInterface {

    /* Module manipulation events */

    event ModuleAdded(address indexed module);

    event ModuleRemoved(address indexed module);

    event ModuleReplaced(address indexed from, address indexed to);


    /* Functions */

    function contains(address _module)  public view returns (bool);

    function size() public view returns (uint);

    function isConstant(string memory _name) public view returns (bool);

    function get(string memory _name)  public view returns (address);

    function getName(address _module)  public view returns (string memory);

    function first() public view returns (address);

    function next(address _current)  public view returns (address);

    function set(string memory  _name, address _module, string memory _abi, bool _constant) public;

    function remove(string memory _name) public;
}