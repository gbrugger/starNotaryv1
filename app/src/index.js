"use strict";
import starNotaryArtifact from "../../build/contracts/StarNotary.json";
const App = {
  web3: null,
  account: null,
  contract: null,

  start: async function () {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = starNotaryArtifact.networks[networkId];
      this.contract = new web3.eth.Contract(
        starNotaryArtifact.abi,
        deployedNetwork.address
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
    } catch (error) {
      console.error("Could not connect to contract or chain.", error);
    }
  },

  setStatus: function (message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  getStarName: async function () {
    const { starName } = this.contract.methods;
    const _name = await starName().call();
    const starNameElement = document.getElementById("starName");
    starNameElement.innerHTML = _name;
  },

  getStarOwner: async function () {
    const { starOwner } = this.contract.methods;
    const _owner = await starOwner().call();
    const starOwnerElement = document.getElementById("starOwner");
    starOwnerElement.innerHTML = _owner;
  },

  claimStar: async function () {
    const { claimStar, starOwner } = this.contract.methods;
    await claimStar().send({ from: this.account });
    const _owner = await starOwner().call();
    App.setStatus(`New star owner is ${_owner}.`);
  },
};

window.App = App;

window.addEventListener("load", function () {
  if (typeof web3 !== "undefined") {
    App.web3 = new Web3(window.ethereum);
  } else {
    console.warn("No web3 detected. Falling back to http://172.29.7.230:8545.");
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://172.29.7.230:8545")
    );
  }

  App.start();
});

getStarNameButton.addEventListener("click", event => {
  App.getStarName();
});

getStarOwnerButton.addEventListener("click", event => {
  App.getStarOwner();
});

claimStarButton.addEventListener("click", event => {
  App.claimStar();
});
//   claimStarButton.addEventListener("click", event => {

//   const message = document.getElementById("userInput").value;
//   remixContract.methods
//     .setMessage(message)
//     .send({
//       from: sendingAddress,
//       // gasPrice: 20000000000,
//       // gas: 6721975,
//     })
//     .then(console.log)
//     .catch(console.log);
//   console.log(message);
//   remixContract.methods.getMessage().call().then(console.log);
// });
