# Getting Started with Zilliqa Fullstack App

The Zilliqa Fullstack app is a full-fledged application on the Zilliqa Blockchain for listing and renting houses.

[Watch the demo](https://www.loom.com/share/7f9530f80de34ba6be8b9a954f331e47).

[Try the app](https://rentonzilliqa-frontend.vercel.app).

## The technology

- [Create React App](https://github.com/facebook/create-react-app) for the frontend.
- [Tailwind CSS](https://tailwindcss.com) for styling.
- The `/src/scilla` contains the Scilla contract. We can use the [Zilliqa JavaScript Library](https://github.com/Zilliqa/Zilliqa-JavaScript-Library) or the Scilla Online IDE to deploy the contract. Please add the contract address in `REACT_APP_SMART_CONTRACT_ADDRESS` variable in a `.env` file in the root of the project.

## Built by Quinence

<img src="https://user-images.githubusercontent.com/40576802/117850196-b4a39e80-b2a2-11eb-9e7d-8ecbbf1b04d6.png" width="60">

[Quinence - Digital product specialists from Singapore](https://quinence.com).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
