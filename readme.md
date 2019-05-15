# Firebase Authentication Integration

### Content
The purpose of this material is to exemplify the integration of Firebase Authentication into a web project. It will be possible to create a user (with confirmation by email), log in, log out, update the user and recover the password while following each update of the object in real time.

### Libs
- Firebase
- React
- UI material

### Dependencies
- Node.js
- Yarn

### Use
- Clone the project
- Access the directory and install the dependencies with the command below
```sh
  $ yarn
```
- Rename the `index.js.example` file (which is inside the src folder) to `index.js`
- Within this file, enter the configuration parameters provided when creating the project in Firebase
- In the Firebase console, go to `Authentication` > `Login Methods` and enable this option
- Go back to the terminal and run the command:
```sh
  $ yarn start
```
