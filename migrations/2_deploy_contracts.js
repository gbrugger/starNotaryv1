const StarNotary = artifacts.require("../contracts/StarNotary");

module.exports = function (deployer) {
  deployer.deploy(StarNotary);
};
