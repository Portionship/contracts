# Portionship

Frictionless Mortgage-free Property Ownership. We re-engineered the [property ownership](https://portionship.com) to make it affordable, easy to liquidate and remove the interest rate fluctuation risk.

Start generating passive rental income by owning properties worldwide for as low as $500. Learn more at https://portionship.com.

This project is open-sourced to create transparency between community members. You can read all the contracts, run them, and test them. You can even start a business similar to what we have created.

100% transparency is what a strong community needs. Not only have we shared everything publicly, but we also have training courses to educate investors on property investment, web3.

## Smart Contracts
We have used a series of smart contracts to tokenize the properties, distribute the monthly income and give voting power to owners.

### Start Here

You need to have NodeJS installed. We suggest using this guide [NVM](https://github.com/nvm-sh/nvm). Once Node is installed, you need to install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable). Now you are ready to run this project.

Now, install the packages and test your installation.

```
    yarn install
    yarn test
```

### .env file
You need to make a copy of `.env.sample` file based on your credentials and environment and save it in the root folder as `.env`.

### Deploy a contract

Once everything is working, you can set the network you want to deploy to by editing `hardhat.config.js` file. And run the below commands.

```
    npx hardhat compile
    npx hardhat --network goerli run scripts/deploy.js
```

### Mint

Once your contract is deployed you can mint a property using the mint function.

```
    node scripts/mint-nft.js   
```