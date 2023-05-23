const StarNotary = artifacts.require("../contracts/StarNotary");

let instance;
let accounts;
let owner;

contract("StarNotary", accs => {
  accounts = accs;
  owner = accounts[0];
});

it("has correct name", async () => {
  const instance = await StarNotary.deployed();
  const starName = await instance.starName.call();
  assert.equal(starName, "Awesome Udacity Star");
});

it("can be claimed", async () => {
  const instance = await StarNotary.deployed();
  await instance.claimStar({ from: owner });
  const starOwner = await instance.starOwner.call();
  assert.equal(starOwner, owner);
});

it("can change owners", async () => {
  const instance = await StarNotary.deployed();

  await instance.claimStar({ from: owner });
  let starOwner = await instance.starOwner.call();
  assert.equal(starOwner, owner);

  const secondAccount = accounts[1];
  await instance.claimStar({ from: secondAccount });
  let secondOwner = await instance.starOwner.call();
  assert.equal(secondOwner, secondAccount);
});

it("can change name", async () => {
  const instance = await StarNotary.deployed();
  const newName = "New Name";
  await instance.changeName(newName);
  const newNameFromContract = await instance.starName.call();
  assert.equal(newName, newNameFromContract);
});
