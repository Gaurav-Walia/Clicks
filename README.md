# Click

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The application is given an array of clicks as input and produces subset of clicks as an output based on the below conditons:

1. For each IP within each one hour period, only the most expensive click is placed into the
result set.
2. If more than one click from the same IP ties for the most expensive click in a one hour
period, only place the earliest click into the result set.
3. If there are more than 10 clicks for an IP in the overall array of clicks, do not include any
of those clicks in the result set.

Note - As per the input provided in the clicks.json file:
Click with ip "22.22.22.22" is removed from the result as it is appearing more than 10 times in the overall clicks.


# Application

## Library

### react
React is a JavaScript library for creating user interfaces.

### react-dom
This package serves as the entry point to the DOM and server renderers for React.

### underscore
Underscore.js is a utility-belt library for JavaScript that provides support for the usual functional suspects (each, map, reduce, filter...) without extending any core JavaScript objects.

### enzyme
Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output. 

### jest
Jest is a javascript library used for testing.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# Deployment

The Click application is deployed on Heroku - https://clicks-app.herokuapp.com


