# Tender Tummies

[Tender Tummies has deployed!](https://elizawmeeks.github.io/tender-tummies/#!/splash)

An FPIES (Food Protein Induced Enterocolitis Syndrome) tracking app. FPIES is a rare food allergy that requires a lot of tracking of information, symptoms, trials and reactions. Tender Tummies attempts to facilitate parents managing a complex, rare disease like FPIES to keep all of their information in one place and make it easy to share that information with caregivers and family members.

## Getting Started

This project uses Grunt, Firebase, and Angular I.

### Prerequisites

You will need to npm install the package.json file, and create an app/values folders to hold your firebase credentials.

### Installing

Create a values directory inside of the app directory. Create a file names "fbcreds.js" inside of the values directory, and paste the following code into your fbcreds.js. Replace "YourAPIKey" and "YourFirebaseAccount" with your API Key and project name from firebase.

```javascript
"use strict";

app.constant("fbcreds", {
    apiKey: "YourAPIKey",
    authDomain: "YourFirebaseAccount.firebaseapp.com",
    databaseURL: "https://YourFirebaseAccount.firebaseio.com"    
});
```

Enter the "lib" directory on the terminal and run:

```
npm install
```

After everything is installed start grunt, still in your lib folder in your terminal, by running:

```
grunt
```

## Built With

 * [Materialize CSS](http://materializecss.com/) - A modern responsive CSS framework based on Material Design by Google.
 * [Angularjs](https://angularjs.org/) - What HTML would have been, had it been designed for building web-apps
 * [Angular Materialize](https://krescruz.github.io/angular-materialize/) - Angularjs directives for Materialize CSS Framework.
 * [JS Hint](http://jshint.com/) - A tool that helps to detect errors and potential problems in your JavaScript code.
 * [Grunt](https://gruntjs.com/) - Javascript task runner.
 * [JQuery](https://jquery.com/) - The Write Less, Do More, JavaScript Library.
