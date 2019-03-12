
![](/pic/0.PNG)
## MXC AXS Wallet
#### Latest Release: V 1.1 
## Why is MXC AXS Wallet created
- Dedicated to building a convenient and robust connection with contract of MXC Tokens 
- Unlike Ethereum Wallet or MyEtherWallet, MXC AXS Wallet does not only read information from the contract, but also interpret it and offer simple interfaces for users to do transactions or read information of their assets
- MXC owners who are willing to participate in the MXProtocol ecosystem will be able to have a better experience with MXC AXS Wallet. Smart integration with MXC Cloud will be introduced in the wallet.

## Why is MXC AXS Wallet secure
- MXC AXS Wallet is not storing any private information from users' accounts
- All private information is stored locally via management offered by MetaMask which is tested by the community for a long time

## What can you do with the current release
#### - Manage your accounts
- You can create new accounts deterministically once you login with the password(DO NOT FORGET YOUR PASSWORD), every information about your account is stored locally on your computer.
- You can import your existing accounts with each private key or with the combinations of keyfile and password to the keyfile.
- You can use your ledger to interact with the wallet.
#### - Manage your assets
- You can check balance of your Ether and MXC
- You can check status of your locked MXC

![](/pic/1.PNG)

- You can check transaction histories. Each history is linked to corresponding transaction record on [etherscan.io](https://etherscan.io/)

![](/pic/2.PNG)

- Send Ether, MXC

![](/pic/3.PNG)

![](/pic/4.PNG)

- Grant MXC tokens

![](/pic/5.PNG)

This is one interesting feature of MXC AXS Wallet. When you want to deliver your tokens to someone gradually, you can choose to __Grant__ tokens to the address, with cliff period and vesting period defined.

Cliff period represents from the time someone is granted with MXC tokens, until when one can start redeeming tokens.
Vesting period represents until when one can redeeming all the granted tokens.
The amount one can redeem per month equals to the value of grant amount being devided by vesting periods.

*__Example:__*
Alex granted Bob 1000 MXC on 1st January this year, defing cliff periods as 3, vesting periods as 10.

![](/pic/qqq.PNG)

From the moment Alex click __Grant Tokens__, Bob can start having redeemable tokens in 3 months, in 10 months B should be able to redeem all 1000 MXC tokens.<br> 
Now let's calculate how much and in what way Bob can redeem tokens . <br> 
Amount = 1000<br> 
Vesting periods = 10<br> 
Redeemable amount per month = amount/vesting periods = 100<br> 
Bob should be able to redeem 3 * 100 MXC tokens on 31st March ( 3 * 30 days ).<br> 
Next month, on 30th April ( 30 days ), Bob should be able redeem 1 * 100 MXC tokens. <br> 
So on and so forth, Bob can redeem 1 * 100 tokens per month until October ( specifically on 27th October ), he can redeem all 1000 MXC tokens.

## Notes for developer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

Before you start install all dependencies

#### `yarn`

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `yarn watch:tests`

Launches the test runner in the interactive watch mode.<br>


#### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
