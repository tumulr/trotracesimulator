# Trot Race Simulator

Trot race simulator written in Node.js.

#### Steps to perform to start the server:
- npm i - To install the dependencies
- Call POST:/auth method and get the token
- Call POST:/fill with the bearer token
- Once it is successful, uncomment initApp() line in app.js
- npm run start or node app - To start the server at port 3000

#### Supported API's
- /auth - To authenticate the user
- /fill - You need this to prefill the data like horses
- /fetch - To get completed race events. You can also get the active races by doing /fetch?status=ACTIVE
