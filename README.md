
# HelpDesk System

![HelpDesk Screenshot](image-readme.png)

## Overview
**HelpDesk System** is a simple web application designed to manage customer support tickets. You can submit new and edit support requests e edit status of their tickets. Built with **React** for a dynamic user experience and **Firebase** for data storage.

## Features
- Submit new support tickets with titles and descriptions.
- View the list of submitted tickets and their current status.
- updates for ticket statuses using **Firebase**.
- Easy navigation and user-friendly interface.
- Responsive design for optimal viewing on all devices.

## Technologies Used
<table align="left" height="255px">
  <tr>
    <td align="center">
      <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/">
        <img src="https://skillicons.dev/icons?i=html" width="65px" alt="HTML5 icon"/><br/>
        <sub>
          <b>
            <pre>HTML5</pre>
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/">
        <img src="https://skillicons.dev/icons?i=css" width="65px" alt="CSS3 icon"/><br/>
        <sub>
          <b>
            <pre>CSS3</pre>
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/">
        <img src="https://skillicons.dev/icons?i=js" width="65px" alt="Javascript icon"/><br/>
        <sub>
          <b>
            <pre>Javascript</pre>
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://react.dev/">
        <img src="https://skillicons.dev/icons?i=react" width="65px" alt="React icon"/><br/>
        <sub>
          <b>
            <pre>React</pre>
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://firebase.google.com/">
        <img src="https://skillicons.dev/icons?i=firebase" width="65px" alt="Firebase icon"/><br/>
        <sub>
          <b>
            <pre>Firebase</pre>
          </b>
        </sub>
      </a>
    </td>
  </tr>
</table>
<br/><br/><br/><br/><br/><br/><br/><br/>

## Getting Started
Follow these steps to set up and run the HelpDesk System locally:

1. Clone the repository:
   git clone https://github.com/leonardohernandesq/sistemadechamados

2. Install the dependencies:
   npm install

3. Set up Firebase:
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Add your Firebase configuration to the project. (Replace the `firebase-config.js` with your Firebase credentials).

4. Start the development server:
   npm start

   The app will be available at http://localhost:3000.

## Firebase Setup
To integrate Firebase with this project, you need to set up Firebase for storing and managing the support tickets. Here are the steps:

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Set up Firebase Firestore and Firebase Authentication.
3. Create a `firebaseConnection.js` file in the `services` directory with your Firebase project credentials:

```javascript
// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-PROJECT.firebaseapp.com",
  projectId: "YOUR-PROJECT",
  storageBucket: "YOUR-PROJECT.appspot.com",
  messagingSenderId: "YOUR-SENDER-ID",
  appId: "YOUR-APP-ID",
};
```

Visit the live site at [HelpDesk System](https://sistemadechamados.vercel.app/).
